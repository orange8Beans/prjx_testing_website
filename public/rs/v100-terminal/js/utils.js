/**
 Copyright 2014 Gordon Williams (gw@pur3.co.uk)

 This Source Code is subject to the terms of the Mozilla Public
 License, v2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
 
 ------------------------------------------------------------------
  Utilities
 ------------------------------------------------------------------
**/
"use strict";

v100.Utils = (function(){
  
  function init() {
    
  }
  
  function isWindows() {
    return navigator.userAgent.indexOf("Windows")>=0;
  }
  
  function getChromeVersion(){
    return parseInt(window.navigator.appVersion.match(/Chrome\/(.*?) /)[1].split(".")[0]);
  }
  
  function escapeHTML(text, escapeSpaces) 
  {
    escapeSpaces = typeof escapeSpaces !== 'undefined' ? escapeSpaces : true;

    var chr = { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;', ' ' : (escapeSpaces ? '&nbsp;' : ' ') };
    
    return text.toString().replace(/[\"&<> ]/g, function (a) { return chr[a]; });    
  }
  
  function getSubString(str, from, len) {
    if (len == undefined) {
      return str.substr(from, len);
    } else {
      var s = str.substr(from, len);
      while (s.length < len) s+=" ";
      return s;
    }
  };  
  
  /** Get a Lexer to parse JavaScript - this is really very nasty right now and it doesn't lex even remotely properly.
   * It'll return {type:"type", str:"chars that were parsed", value:"string", startIdx: Index in string of the start, endIdx: Index in string of the end}, until EOF when it returns undefined */
  function getLexer(str) {
    // Nasty lexer - no comments/etc
    var chAlpha="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var chNum="0123456789";
    var chAlphaNum = chAlpha+chNum;
    var chWhiteSpace=" \t\n\r";
    var chQuotes = "\"'";
    var ch = str[0];
    var idx = 1;
    var nextCh = function() { ch = str[idx++]; };
    var isIn = function(s,c) { return s.indexOf(c)>=0; } ;
    var nextToken = function() {
      while (isIn(chWhiteSpace,ch)) {
        nextCh();
      }
      if (ch==undefined) return undefined; 
      if (ch=="/") {
        nextCh();
        if (ch=="/") {
          // single line comment
          while (ch!==undefined && ch!="\n") nextCh();
          return nextToken();
        } else if (ch=="*") {
          nextCh();
          var last = nextCh();
          // multiline comment          
          while (ch!==undefined && !(last=="*" && ch=="/")) {
            last = ch;
            nextCh();
          }
          nextCh();
          return nextToken();
        }
        return {type:"CHAR", str:"/", value:"/", startIdx:idx-2, endIdx:idx-1};
      }
      var s = "";        
      var type, value;
      var startIdx = idx-1;
      if (isIn(chAlpha,ch)) { // ID
        type = "ID";
        do {
          s+=ch;
          nextCh();
        } while (isIn(chAlphaNum,ch));
      } else if (isIn(chNum,ch)) { // NUMBER
        type = "NUMBER";
        do {
          s+=ch;
          nextCh();
        } while (isIn(chNum,ch) || ch==".")
      } else if (isIn(chQuotes,ch)) { // STRING
        type = "STRING";
        var q = ch;
        value = "";
        s+=ch;
        nextCh();
        while (ch!==undefined && ch!=q) {
          s+=ch;
          value += ch;
          nextCh();
        };        
        if (ch!==undefined) s+=ch;
        nextCh();
      } else {
        type = "CHAR";
        s+=ch;
        nextCh();
      }
      if (value===undefined) value=s;
      return {type:type, str:s, value:value, startIdx:startIdx, endIdx:idx-1};
    };
    
    return {
      next : nextToken
    };
  };
  
  /** Try and get a prompt from prjX - if we don't see one, issue Ctrl-C
   * and hope it comes back. */
  function getprjXPrompt(callback) {
    var  receivedData = "";

    var prevReader = v100.Serial.startListening(function (readData) {
      var bufView = new Uint8Array(readData);
      for(var i = 0; i < bufView.length; i++) {
        receivedData += String.fromCharCode(bufView[i]);
      }
      if (receivedData[receivedData.length-1] == ">") {
        console.log("Found a prompt... good!");
        clearTimeout(timeout);
        nextStep();         
      }        
    });      
    // timeout in case something goes wrong...
    var timeout = setTimeout(function() {          
      console.log("Got "+JSON.stringify(receivedData));          
      // if we haven't had the prompt displayed for us, Ctrl-C to break out of what we had
      console.log("No Prompt found, got "+JSON.stringify(receivedData[receivedData.length-1])+" - issuing Ctrl-C to try and break out");
      v100.Serial.write('\x03');
      nextStep();
    },500);        
    // when we're done...
    var nextStep = function() {
      // send data to console anyway...
      prevReader(receivedData);
      receivedData = "";
      // start the previous reader listening again
      v100.Serial.startListening(prevReader);
      // call our callback
      callback();
    };
    // send a newline, and we hope we'll see '=undefined\r\n>'
    v100.Serial.write('\n');
  };  
  
  /** Return the value of executing an expression on the board */
  function executeExpression(expressionToExecute, callback) {
    var  receivedData = "";
    
    function getProcessInfo(expressionToExecute, callback) {      
      var prevReader = v100.Serial.startListening(function (readData) {
        var bufView = new Uint8Array(readData);
        for(var i = 0; i < bufView.length; i++) {
          receivedData += String.fromCharCode(bufView[i]);
        }
        // check if we got what we wanted
        var startProcess = receivedData.indexOf("<<<<<");
        var endProcess = receivedData.indexOf(">>>>>", startProcess);
        if(startProcess >= 0 && endProcess > 0){
          // All good - get the data!
          var result = receivedData.substring(startProcess + 5,endProcess);       
          console.log("Got "+JSON.stringify(receivedData)); 
          // strip out the text we found
          receivedData = receivedData.substr(0,startProcess) + receivedData.substr(endProcess+5);
          // try and strip out the echo 0 too...
          receivedData = receivedData.replace("echo(0);","");       
          // Now stop time timeout
          clearTimeout(timeout);
          // Do the next stuff
          nextStep(result);
        }
      });
      
      // when we're done...
      var nextStep = function(result) {
        // start the previous reader listing again
        v100.Serial.startListening(prevReader);
        // forward the original text to the previous reader
        prevReader(receivedData);
        // do echo(1) here as this will re-show the prompt
        v100.Serial.write('echo(1);\n');
        // run the callback
        callback(result);
      };
      // string adds to stop the command tag being detected in the output
      v100.Serial.write('echo(0);\nconsole.log("<<"+"<<<"+JSON.stringify('+expressionToExecute+')+">>>"+">>");\n');
      //
      var timeout = setTimeout(function(){
        console.warn("No result found - just got "+JSON.stringify(receivedData));          
        nextStep(undefined);        
      },500);   
    }    
   
    if(v100.Serial.isConnected()){
      v100.Utils.getprjXPrompt(function() {
        getProcessInfo(expressionToExecute, callback);
      });
    }
  };
  
  function versionToFloat(version) {
    return parseFloat(version.trim().replace("v","."));
  };    
  
  /** Make an HTML table out of a simple key/value object */
  function htmlTable(obj) {
    var html = '<table>';
    for (var key in obj) {
      html += '<tr><th>'+v100.Utils.escapeHTML(key)+'</th><td>'+v100.Utils.escapeHTML(obj[key])+'</td></tr>';
    }
    return html + '</table>';
  }
  
  function markdownToHTML(markdown) {
    var html = markdown;
    //console.log(JSON.stringify(html));
    html = html.replace(/\n\s*\n/g, "\n<br/><br/>\n"); // newlines
    html = html.replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>"); // bold
    html = html.replace(/```(.*)```/g, "<span class=\"code\">$1</span>"); // code
    //console.log(JSON.stringify(html));
    return html;
  };  
  
  /// Gets a URL, and returns callback(data) or callback(undefined) on error
  function getURL(url, callback) {
    prjXX.callProcessor("getURL", { url : url, data : undefined }, function(result) {
      if (result.data!==undefined) {
        callback(result.data);
      } else {
        $.get( url, callback, "text" ).fail(function() {
          callback(undefined);
        });
      }
    });
  }
  
  function isURL(text) {
    return (new RegExp( '(http|https)://' )).test(text);
  }

  <!-- HTTP Request -->
  // Get data from element
  var getDataHTTP = (function () {
    var received_data = "";
    var replySwitch = "Device Reply Enabled"

    var make_request = function (data) {
      // make a HTTP GET request:
      var request = new XMLHttpRequest();
      // GET /analog/channelNum, and make an asynchronous request:
      request.open("GET", '/analog/' + data + ">>" + replySwitch, true);
      //testValue.innerText = channelText;
      // close the request:
      request.send(null);
      // when the request gets a response, call showSensorValue with the result:
      request.onreadystatechange = function () {
        received_data = request.responseText;
      };
    };

    var fetch_data = function () {
      return received_data;
    };

    return {
      make_request: make_request,
      fetch_data  : fetch_data
    };
  })();
  <!-- Socket.IO-->
  /*
  var socket = (function() {
    var socket_obj = 'http://localhost';
    var set_server_address = function(address) {
      socket_obj = io.connect(address);
    };
    return {
      socket : socket_obj,
      init: set_server_address
    }
  })(); */
  var socket = io.connect('http://localhost');

//  prjX.Core.Utils = {
  return {
      init : init,
      isWindows : isWindows,   
      getChromeVersion : getChromeVersion,
      escapeHTML : escapeHTML,
      getSubString : getSubString,
      getLexer : getLexer,
      getprjXPrompt : getprjXPrompt,
      executeExpression : executeExpression,
      versionToFloat : versionToFloat,
      htmlTable : htmlTable,
      markdownToHTML : markdownToHTML,
      getURL : getURL,
      isURL : isURL,

      getDataHTTP : getDataHTTP,
      socket : socket
  };
}());
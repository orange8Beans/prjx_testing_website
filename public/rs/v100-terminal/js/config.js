/**
**/
"use strict";
(function() {
  
  /** See addSection and getSections */
  var builtinSections = {};

  function _get(callback) {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get( "CONFIGS", function (data) { 
        var value = data["CONFIGS"];
        console.log("GET chrome.storage.sync = "+JSON.stringify(value));
        callback(value);
      });
    } else {
      callback({});
    }
  }

  function _set(data) {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      console.log("SET chrome.storage.sync = "+JSON.stringify(data));
      chrome.storage.sync.set({ CONFIGS : data });    
    }
  }
  
  function loadConfiguration(callback) {
    _get(function (value) {
      for (var key in value) { 
        if (key=="set") continue;
        Espruino.Config[key] = value[key];
        if (Espruino.Core.Config.data[key] !== undefined &&
            Espruino.Core.Config.data[key].onChange !== undefined)
          Espruino.Core.Config.data[key].onChange(value[key]);
      }  
      if (callback!==undefined)
        callback();
    });
  }
  
  function init() {
    addSection("General", { sortOrder:100, description: "General Web IDE Settings" });
    addSection("Communications", { sortOrder:200, description: "Settings for communicating with the Espruino Board" });
    addSection("Board", { sortOrder:300, description: "Settings for the Espruino Board itself" });
    
  }
  
  function add(name, options) {
    Espruino.Core.Config.data[name] = options;
    if (Espruino.Config[name] === undefined)
      Espruino.Config[name] = options.defaultValue;
  }
  
  /** Add a section (or information on the page).
   * options = {
   *   sortOrder : int, // a number used for sorting
   *   description : "",
   *   getHTML : function(callback(html)) // optional
   * };
   */
  function addSection(name, options) {
    options.name = name;
    builtinSections[name] = options;
  }
  
  /** Get an object containing the information on a section used in configs */
  function getSection(name) {
    if (builtinSections[name]!==undefined)
      return builtinSections[name];
    // not found - but we warned about this in getSections
    return {
      name : name
    };
  }
  
  /** Get an object containing information on all 'sections' used in all the configs */
  function getSections() {
    var sections = [];
    // add sections we know about
    for (var name in builtinSections)
      sections.push(builtinSections[name]);
    // add other sections
    for (var i in Espruino.Core.Config.data) {
      var c = Espruino.Core.Config.data[i];
      
      var found = false;
      for (var s in sections)
        if (sections[s].name == c.section)
          found = true;
      
      if (!found) {
        console.warn("Section named "+c.section+" was not added with Config.addSection");
        sections[c.section] = {
            name : c.section,
            sortOrder : 0
        };        
      }
    }
    // Now sort by sortOrder
    sections.sort(function (a,b) { return a.sortOrder - b.sortOrder; });
    
    return sections;
  }
  
  Espruino.Config = {};
  Espruino.Config.set = function (key, value) {
    if (Espruino.Config[key] != value) {
      Espruino.Config[key] = value;
      // Do the callback
      if (Espruino.Core.Config.data[key] !== undefined &&
          Espruino.Core.Config.data[key].onChange !== undefined)
        Espruino.Core.Config.data[key].onChange(value);
      // Save to synchronized storage...
      var data = {};
      for (var key in Espruino.Config)
        if (key != "set")
          data[key] = Espruino.Config[key];      
      _set(data); 
    }
  };
   
  function clearAll() { // clear all settings
    _set({});
    for (var name in Espruino.Core.Config.data) {
      var options = Espruino.Core.Config.data[name];
      Espruino.Config[name] = options.defaultValue;
    }
  }
  
  Espruino.Core.Config = {
      loadConfiguration : loadConfiguration, // special - called before init 
      
      init : init,
      add : add,
      data : {},
      
      
      addSection : addSection,
      getSection : getSection,
      getSections : getSections,
      
      clearAll : clearAll, // clear all settings
  };
  
})();

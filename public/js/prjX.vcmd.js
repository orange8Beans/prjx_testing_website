/**
 * Created by ChengCheng on 2015/7/16.
 */
$(function() {

  var device_led = prjX.model.deviceDemo;

  var final_transcript = '';
  var recognizing = false;

  // DOM
  var final_span = $('#final_span');
  var interim_span = $('#interim_span');
  var start_button = $('#start_button');


  var pre_string=[], result_string = [];

  if ('webkitSpeechRecognition' in window) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    //recognition.continuous = false;

    recognition.interimResults = true;

    recognition.onstart = function() {
      recognizing = true;
    };

    recognition.onerror = function(event) {
      //console.log(event.error);
    };

    recognition.onend = function() {
      recognition.start();

      recognizing = false;
    };

    recognition.onresult = function(event) {
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      final_transcript = capitalize(final_transcript);
      //final_span.innerHTML = linebreak(final_transcript);
      //interim_span.innerHTML = linebreak(interim_transcript);

      pre_string    = result_string;

      // Store the interim result
      result_string = linebreak(interim_transcript).split(' ');
      // Analyze the result

      final_span.html( linebreak(final_transcript) );
      //interim_span.html( linebreak(interim_transcript) );

      console.log( result_string, find('start', result_string), find('stop', result_string));

      // pure testing
      if( findAll([ ['music'], ['on', 'start', 'play', 'begin'] ], result_string) ) {
        device_led.update_color({
          tgt        :  2,
          cmd        :  5,
          lod        :  0
        });
        final_transcript = '';
        return true;
      }
      if( findAll([ ['music'], ['off' , 'of', 'stop', 'down'] ], result_string) ) {
        device_led.update_color({
          tgt        :  2,
          cmd        :  4,
          lod        :  0
        });
        final_transcript = '';
        return true;
      }


      if( findAll([ ['light', 'let', 'lights' ,'led', 'LED'], ['white', 'on', 'start', 'play', 'begin'] ], result_string) ) {
        device_led.update_color({
          tgt        :  2,
          cmd        :  7,
          lod       :  '(255,255,255)'
        });
        final_transcript = '';
        return true;
      }

      if( findAll([ ['light', 'let', 'lights' ,'led', 'LED'], ['blue'] ], result_string) ) {
        device_led.update_color({
          tgt        :  2,
          cmd        :  7,
          lod       :  '(0,0,255)'
        });
        final_transcript = '';
        return true;
      }

      if( findAll([ ['light', 'let', 'lights' ,'led', 'LED'], ['green'] ], result_string) ) {
        device_led.update_color({
          tgt        :  2,
          cmd        :  7,
          lod       :  '(0,255,0)'
        });
        final_transcript = '';
        return true;
      }

      if( findAll([ ['light', 'let', 'lights' ,'led', 'LED', 'Lite'], ['bright', 'Rite', 'red' , 'right'] ], result_string) ) {
        device_led.update_color({
          tgt        :  2,
          cmd        :  7,
          lod       :  '(255,0,0)'
        });
        final_transcript = '';
        return true;
      }

      if( findAll([ ['light', 'let', 'lights' ,'led', 'LED'], ['off' , 'of', 'stop', 'down'] ], result_string) ) {
        device_led.update_color({
          tgt        :  2,
          cmd        :  7,
          lod       :  '(0,0,0)'
        });
        final_transcript = '';
        return true;
      }

    };
  }

  var two_line = /\n\n/g;
  var one_line = /\n/g;

  // Find if the cmd string in result string
  //

  function findAll(cmd_arry, str) {
    var i = 0, j = 0, len = cmd_arry.length, flag = true, inner_len= 0, inner_flag = false;
    for (i=0; i<len; i += 1) {

      inner_len = cmd_arry[i].length;
      inner_flag = false;

      for (j=0; j<inner_len; j += 1) {
        inner_flag = inner_flag || find(cmd_arry[i][j], str);
      }

      flag = flag && inner_flag;

      //flag = flag && find(cmd_arry[i], str);
    }
    return flag;
  }

  function find(cmd, str) {
    if ( $.inArray(cmd, str) !== -1 ) {
      return true;
    }
    return false;
  }

  function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
  }

  function capitalize(s) {
    return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
  }

  function startDictation(event) {
    if (recognizing) {
      recognition.stop();
      return;
    }
    final_transcript = '';
    recognition.lang = 'en-US';
    recognition.start();
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
  }

  start_button.on('click', startDictation(event));

});
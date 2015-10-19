/**
 * Created by cczhang on 12/2/2015.
 */
/*
 * File : prjX.shell.js
 * Main : prjX
 * Type : Shell module
 */
/*jslint          node : true, continue : true,
 devel  : true, indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white  : true
 */
/*global $, prjx */
prjX.shell = (function () {
  'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      anchor_schema_map : {},
      main_html : String(),
                    //+ '<div id="rgb-value"></div>'
      html_map  : {}
    },

    stateMap = {
      $container  : undefined,
      anchor_map  : {}
    },
    jqueryMap = {},
    setJqueryMap,
    configModule, initModule,

    getTemplate, arrayDiff,
    onTinyColorPick,
    counter=0;

  //////////////////////////////////
  // Move to separate module later
  //////////////////////////////////
  var device_led = prjX.model.deviceDemo;

  // Load the Main Content html from templates
  configMap.html_map['prjx'] = String() +  $.ajax({
    url: "/templates/prjx.html",
    async: false
  }).responseText;

  // Load HTML Templates (button/stage pairs)
  // Use a function to generate this dict


//================= END MODULE SCOPE VARIABLES ===============

//------------------- BEGIN UTILITY METHODS ------------------
// Begin DOM utility method
  getTemplate = function (_url) {
    return (
      String()
      +  $.ajax({
        url   : _url,
        async : false
      }).responseText
    );
  };
// End DOM utility method

// Find difference of two array
  arrayDiff = function (new_array, old_array) {
    var baz;

    baz = $(old_array).not(new_array).get();

    return baz;
  };

//==================== END UTILITY METHODS ===================

//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
//
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container    : $container,
      //$rgb_value    : $container.find('#rgb-value')

      $main_stage   : $container.find('#main-stage'),
      $nav_bar      : $container.find('#nav-bar'),

      $nav_bar_community   : $container.find('#nav_Comu').find('li'),
      $nav_bar_alert       : $container.find('#nav_Update_alerts'),

      $nav_bar_taste       : $container.find('#nav_Taste'),
      $nav_btn_color       : $container.find('#nav_Taste_color'),
      $nav_btn_music       : $container.find('#nav_Taste_music'),

      $nav_bar_create      : $container.find('#nav_Create'),
      $nav_btn_blocky      : $container.find('#nav_Create_blocky'),
      $nav_btn_ide         : $container.find('#nav_Create_ide'),
      $nav_btn_terminal    : $container.find('#nav_Create_terminal')
    };
  };
// End DOM method /setJqueryMap/
//====================== END DOM METHODS =====================

//------------------- BEGIN EVENT HANDLERS -------------------
//==================== END EVENT HANDLERS ====================

//------------------- BEGIN PUBLIC METHODS -------------------
// Begin public method /configModule/
// Purpose   : Adjust configuration of allowed keys
// Arguments : A map of settable keys and values
//
  configModule = function () {

  };
// End public method /configModule/

// Begin public method /initModule/
// Purpose   : Initializes module
//
  initModule = function ($container) {
    // Modules Dependencies
    var
      stg = prjX.stage;
    // load HTML and map jQuery collections
    configMap.main_html = configMap.html_map['prjx'];
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();

    // Initialize stage modules
    //
    var
      LED_Maker, Melody_Maker,
      IDE_Maker, Blocky_Maker, Terminal_Maker,
      SELECT_Maker,

      led1, led2, led3, led4, led5,
      select1,
      melody1, melody2,
      ide1, blocky1, terminal1
      ;

    SELECT_Maker = prjX.stg_module.hireMaker(
      {
        main_html: getTemplate("/templates/prjx_stg_mod_select.html"),
        class   : 'SELECT'
      }
    );


    LED_Maker    = prjX.stg_module.hireMaker(
      {
        main_html: getTemplate("/templates/prjx_stg_mod_led.html"),
        class   : 'LED',
        rd_func :       function () {
                          $('.mini_color').each(function () {
                          //$(this).minicolors();
                          //$( ".form-group" ).draggable();
                        });
        }
      }
    );

    Melody_Maker = prjX.stg_module.hireMaker(
      {
        main_html: getTemplate("/templates/prjx_stg_mod_melody.html"),
        class: 'Melody'
      }
    );

    IDE_Maker    = prjX.stg_module.hireMaker({class: 'IDE'});
    Blocky_Maker = prjX.stg_module.hireMaker({class: 'Blocky'});

    Terminal_Maker = prjX.stg_module.hireMaker(
      {
        main_html: String()
                 + '<div class="" style="outline:solid;float: left;height:480px;width:970px;">'
                 +  '<div class="module-closer"><span style="vertical-align:middle;display: inline-block;"></span></div>'
                 + '</div>',
        class    : 'Terminal',
        pre_func : function () {
          v100.initModule(terminal1.getDom());
          v100.Terminal.grabSerialPort();
        },
        rd_func  : function () {
          // 'Enter' Key Function
          $("#terminal").keyup(function (e) {
          if (e.keyCode == 13) {
           // Do something
            console.log(v100.Terminal.getEnterText());
          }
         });
        }
      }
    );


    // !!set the customized module functions in the maker Object
    // !!set the similar html settings using maker Object too!!
    $.minicolors.defaults.changeDelay = 200;

    led1 = LED_Maker.makeModule( {id: '1'});
    led1.setLabel('LED Color Changer 1');

    led2 = LED_Maker.makeModule( {id: '2'});
    led2.setLabel('LED Color Changer 2');

    led3 = LED_Maker.makeModule( {id: '3'});
    led3.setLabel('LED Color Changer 3');

    led4 = LED_Maker.makeModule( {id: '4'});
    led4.setLabel('LED Color Changer 4');

    led5 = LED_Maker.makeModule( {id: '5'});
    led5.setLabel('LED Color Changer 5');

    select1 = SELECT_Maker.makeModule({
      id: '1',
      rd_func : function () {
        $("select").select2({dropdownCssClass: 'dropdown-inverse'});

        $(".SELECT .select").on('change', function(e){
          var selected = $(this).val();
          console.log(selected);
        });

        $(".SELECT .multiselect").on('change', function(e){
          var
            _idx,
            add_flag = false,
            selected,
            selected_list = $(this).val();
          // !!! Write this list checking as a utility function
          // if history doesn't exist yet
          // this is adding
          //
          if (select1.list == undefined ) {
            add_flag = true;
            selected = arrayDiff(select1.list , selected_list);
          }
          // if history exist
          if (select1.list ) {
            // and selected_list exist
            if (selected_list) {
              // and if history list is shorter
              // this is adding
              //
              if (select1.list.length < selected_list.length) {
                add_flag = true;
                selected = arrayDiff(select1.list , selected_list);
              }
              // and if history list is longer
              // this is deleting
              //
              if (select1.list.length > selected_list.length) {
                add_flag = false;
                selected = arrayDiff(selected_list, select1.list);
              }
            }
            // if selected_list doesn't exist
            // this is deleting
            //
            else {
              add_flag = false;
              selected = arrayDiff(selected_list, select1.list);
            }

          }
          select1.list = selected_list;

          console.log(selected,add_flag);
          $.gevent.publish('e-rainbow-select',{add_flag:add_flag,selected:selected})
        });
      }
    });

    melody1 = Melody_Maker.makeModule({id: '1'});
    melody1.setLabel('Music Player 1');

    melody2 = Melody_Maker.makeModule({id: '2'});
    melody2.setLabel('Music Player 2');

    ide1 = IDE_Maker.makeModule({id: '1'});
    ide1.setText('label', 'IDE 1');

    blocky1 = Blocky_Maker.makeModule({id: '1'});
    blocky1.setText('label', 'Blocky 1');

    terminal1 = Terminal_Maker.makeModule( {id : '1'} );
    // End initialize stage modules

    // Begin initialize stages
    var
      stage_rainbow,  stage_melody,
      stage_blocky,   stage_ide,    stage_terminal;

    // Make stage objects, attach $main_stage to it;
    //stage_rainbow = makeStage(jqueryMap.$main_stage, [prjX.minicolor]);

    // create new stages
    stage_rainbow  = stg.makeStage({id:'stage_rainbow'});
    stage_terminal = stg.makeStage({id:'stage_terminal'});
    stage_melody   = stg.makeStage({id:'stage_melody'});
    stage_ide      = stg.makeStage({id:'stage_ide'});
    stage_blocky   = stg.makeStage({id:'stage_blocky'});

    // init stages
    stage_rainbow.init(jqueryMap.$main_stage,[select1]);
    stage_terminal.init(jqueryMap.$main_stage, [terminal1]);
    //stage_melody.init(jqueryMap.$main_stage,[melody1]);
    stage_melody.init(jqueryMap.$main_stage);
    stage_ide.init(jqueryMap.$main_stage,[ide1]);
    stage_blocky.init(jqueryMap.$main_stage,[blocky1]);


    // !!!The following are for testing only!!!
    prjX.Test = function (_key) {
      if (_key !== 'prjx' ) {

      }
    };
    prjX.Sub_Stage = stage_rainbow;

    prjX.BTN_Simulate = function (_key) {
      if (_key !== 'prjx')
      {
        return false;
      }
      stage_rainbow.add(led1);
      stage_rainbow.add(led2);
      stage_rainbow.add(led3);
      stage_rainbow.show();
      $('.mini_color').minicolors();
      var _tempp = stage_rainbow.getDom().html();
      return _tempp;
    };

    // !!!!!!!!

    // Add modules into stages:
    //stage_rainbow.add(led3);
    //stage_melody.add(melody2);
    // End init stages

    // subscribe to feature modules' events
    // $.gevent.subscribe( $container, 'tiny-colorpicked', onTinyColorPick );
    // selection to add or delete modules
    // *** REPLACE $.gevent with Amplify
    //
    $.gevent.subscribe( stage_rainbow.getDom(), 'e-rainbow-select', function (e, obj) {
      if (obj.add_flag === true) {
        switch(obj.selected[0]) {
          case 'LED_1':
              stage_rainbow.add(led1);
              break;
          case 'LED_2':
              stage_rainbow.add(led2);
              break;
          case 'LED_3':
              stage_rainbow.add(led3);
              break;
          case 'LED_4':
              stage_rainbow.add(led4);
              break;
          case 'LED_5':
            stage_rainbow.add(led5);
            break;
          case 'MUSIC_1':
            stage_rainbow.add(melody1);
            break;
          case 'MUSIC_2':
            stage_rainbow.add(melody2);
            break;
          default :
            break;
        }
        // !!! Study why do we need this!
        //
        //$('.mini_color').each(function () {
        //  $(this).minicolors();
        //});
        $('.mini_color').minicolors();
      }
      else {
        switch (obj.selected[0]) {
          case 'LED_1':
            // !!! Add function so that stage can remove by either object or id
            stage_rainbow.remove(led1.getId());
            break;
          case 'LED_2':
            stage_rainbow.remove(led2.getId());
            break;
          case 'LED_3':
            stage_rainbow.remove(led3.getId());
            break;
          case 'LED_4':
            stage_rainbow.remove(led4.getId());
            break;
          case 'LED_5':
            stage_rainbow.remove(led5.getId());
            break;
          case 'MUSIC_1':
            stage_rainbow.remove(melody1.getId());
            break;
          case 'MUSIC_2':
            stage_rainbow.remove(melody2.getId());
            break;
          default :
            break;
        }
      }
    });

    // *** Replace $.gevent with Amplify

    $.gevent.subscribe( stage_terminal.getDom(), 'e-v100-text-enter', function (e, obj) {
      // !!! Need a specific function module to deal with this texts:
      var _str = obj.enter_text;
      var _raw_list = _str.split('.');
      var _cmd_list = [];
      _cmd_list[2] = _raw_list[1].replace(/[\n\r]/g, '');
      if (_raw_list[0].match(/(\d+)/g)) {
        _cmd_list[1] = _raw_list[0].match(/(\d+)/g)[0];
      }
      _cmd_list[0] = _raw_list[0].replace(/[0-9]/g, '');
      console.log(_cmd_list);

      if(_cmd_list[0] && _cmd_list[1] && _cmd_list[2]) {
        var _tgt, _cmd, _lod;
        if(_cmd_list[0] == 'led') {
          _cmd = 7;
          _tgt = _cmd_list[1];
          if(_cmd_list[2] == 'red') {
            _lod = "rgb(255, 0, 0)";
          }
          if(_cmd_list[2] == 'green') {
            _lod = "rgb(0, 255, 0)";
          }
          if(_cmd_list[2] == 'blue') {
            _lod = "rgb(0, 0, 255)";
          }

          if(_cmd_list[2] == 'on') {
            _lod = "rgb(255, 255, 255)";
          }

          if(_cmd_list[2] == 'off') {
            _lod = "rgb(0, 0, 0)";
          }

          device_led.update_color({
            tgt        :  _tgt,
            cmd        :  _cmd,
            lod        :  _lod
          });
        }

        if(_cmd_list[0] == 'music') {
          _tgt = _cmd_list[1];

          if(_cmd_list[2] == 'play') {
            _cmd = 5;
            _lod = 0;
          }
          if(_cmd_list[2] == 'pause') {
            _cmd = 4;
            _lod = 0;
          }

          device_led.update_color({
            tgt        :  _tgt,
            cmd        :  _cmd,
            lod        :  _lod
          });
        }
      }

    });


    // init buttons
    led1.getDom().find('.btn').on('click', function(){
      var rgb_value = led1.getDom().find('.mini_color').minicolors('rgbString');
      console.log(rgb_value );
      device_led.update_color({
        tgt        :  1,
        cmd        :  7,
        lod       :  rgb_value
      });
    });

    led2.getDom().find('.btn').on('click', function(){
      var rgb_value = led2.getDom().find('.mini_color').minicolors('rgbString');
      console.log(rgb_value );
      device_led.update_color({
        tgt        :  2,
        cmd        :  7,
        lod       :  rgb_value
      });
    });

    led3.getDom().find('.btn').on('click', function(){
      var rgb_value = led3.getDom().find('.mini_color').minicolors('rgbString');
      console.log(rgb_value );
      device_led.update_color({
        tgt        :  3,
        cmd        :  7,
        lod       :  rgb_value
      });
    });

    melody1.getDom().find(".btn-fui-play").on('click', function() {
      device_led.update_color({
        tgt        :  1,
        cmd        :  5,
        lod        :  0
      });
    });

    melody1.getDom().find(".btn-fui-pause").on('click', function() {
      device_led.update_color({
        tgt        :  1,
        cmd        :  4,
        lod        :  0
      });
    });

    melody2.getDom().find(".btn-fui-play").on('click', function() {
      device_led.update_color({
        tgt        :  2,
        cmd        :  5,
        lod        :  0
      });
    });

    melody2.getDom().find(".btn-fui-pause").on('click', function() {
      device_led.update_color({
        tgt        :  2,
        cmd        :  4,
        lod        :  0
      });
    });


    // Bind buttons to stage events
    jqueryMap.$nav_btn_color.on('click', function() {
      stage_rainbow.show();
    });
    jqueryMap.$nav_btn_music.on('click', function() {
      stage_melody.show();
    });
    jqueryMap.$nav_btn_blocky.on('click', function() {
      stage_blocky.show();
    });
    jqueryMap.$nav_btn_ide.on('click', function() {
      stage_ide.show();
    });
    jqueryMap.$nav_btn_terminal.on('click', function() {
      stage_terminal.show();
    });

    // Save stage html contents before open new stages

    jqueryMap.$nav_bar_taste.on('click', function() {
      counter += 1;
      jqueryMap.$nav_bar_alert.html(counter);
    });

  };
// End public method /initModule/

// return public methods
  return {
    configModule: configModule,
    initModule  : initModule
  };
//=================== END PUBLIC METHODS =====================
}());
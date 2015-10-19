/**
 * Created by cczhang on 21/4/2015.
 */
/*
 * File : prjX.stageModule.js
 * Main : prjX
 * Type : Stage module creater
 * Sub  : stage Module
 */
/*jslint          node : true, continue : true,
 devel  : true, indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white  : true
 */
/*global $, prjx */
modules = (function () {
  'use strict';
  var
    makeFactory;
  // Factory
  // to make sub-factory for modules
  //
  makeFactory = function (_def_class) {
    var
      makeModule;
    // sub-factory
    // to make individual modules
    //
    makeModule = function (_config_map) {
      var
        _id = _config_map.module_id,
        configMap = {
          main_html   : _config_map.main_html,

          // Default ID is read-only after initialized, module_id is changeable
          def_class   : _def_class,
          module_id   : '',

          settable_map: {
            main_html: true,
            module_id: true
          }
        },

        stateMap = {
          $append_target : null,
          $stage_module  : null,

          temp_html      : null
        },

        jqueryMap = {},
        setJqueryMap,
        configModule, initModule,

        getModuleId,
        getModuleDom,


        saveDom, detach, attach,

        saveContent, backContent, clearContent,

        configRender;

      // Generate a random module id if _module_id is undefined
      if( !_id ) {
        configMap.module_id = configMap.def_class + '_' + Math.floor(Math.random() * 100) + 1;
      }
      else {
        configMap.module_id = configMap.def_class + '_' + _id;
      }


      // Create a DOM for the stage module, and set it's attributes
      //stateMap.$stage_module = $(  String()
      //                           + '<div class="" style="outline:solid;float: left;height:480px;width:300px;">'
      //                           + '</div>');

      stateMap.$stage_module = $(configMap.main_html);

      stateMap.$stage_module.attr({
        class: configMap.def_class,
        id   : configMap.module_id
      });

      stateMap.$stage_module.html(configMap.module_id);


      // Detach DOM from the container, only if the container exists
      detach = function () {
        if (stateMap.$append_target) {
          stateMap.$stage_module.detach();
        }
        else {
          return false;
        }
      };

      // Attach DOM to the container
      attach = function () {
        // With _$con parameter or without
        //if (_$con == stateMap.$append_target ) {
        //  _$con.append(stateMap.$stage_module);
        //}
        if ( stateMap.$append_target ) {
          stateMap.$append_target.append(stateMap.$stage_module);
        }
        else {
          return false;
        }
      };


      // Configure the DOM elements and stored into a temporary container
      //stateMap.$temp_con = $('<div></div>');
      //stateMap.$temp_con.append(configMap.main_html);
      //stateMap.$temp_con.children().last().attr('id', configMap.module_id);
      //stateMap.$stage_module = stateMap.$temp_con.find('#' + configMap.module_id);

      configRender = function ($items) {

      };

      setJqueryMap = function () {
        var
          $append_target = stateMap.$append_target,
          $stage_module  = stateMap.$stage_module;
        jqueryMap = {
          $append_target: $append_target,
          // Stage Module
          $stage_module : $stage_module
        };
      };

      configModule = function (input_map) {
        prjX.util.setConfigMap({
          input_map   : input_map,
          settable_map: configMap.settable_map,
          config_map  : configMap
        });
        return true;
      };
// End public method /configModule/

// Begin public method /initModule/
// Purpose   : Initializes module
//
      initModule = function ($append_target) {

        stateMap.$append_target = $append_target;

        //$append_target.append(stateMap.$stage_module);

        //$append_target.append(configMap.main_html);

        // assign id to the lasted child element, that is this module itself
        //$append_target.children().last().attr('id', configMap.module_id);
        //$append_target.children().last().html(configMap.module_id);

        setJqueryMap();
      };

      getModuleId = function () {
        return configMap.module_id;
      };

      // Return the module's DOM back
      getModuleDom = function () {
        return stateMap.$stage_module;
      };

      return {
        configModule: configModule,
        initModule  : initModule,
        getId       : getModuleId,

        configRender: configRender,
        getDom      : getModuleDom,

        saveDom     : saveDom,
        detach      : detach,
        attach      : attach
      };

    };

    return {
      makeModule : makeModule
    };

  };

  return {
    makeFactory: makeFactory
  };

}());


var LED_Maker = modules.makeFactory('LED');
var led1 = LED_Maker.makeModule(
  {
    main_html: String()
           + '<div class="" style="outline:solid;float: left;height:480px;width:300px;">'
           + '</div>',
    module_id: 1
  }
);

/**
 * Created by ChengCheng on 2015/2/12.
 */
/*
 * File : prjX.testmodule.js
 * Main : prjX
 * Type : Stage module
 * Sub  : testmodule
 */
/*jslint          node : true, continue : true,
 devel  : true, indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white  : true
 */
/*global $, prjx */
prjX.testModule = (function () {
  'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
                + '<div class="testmodule" style="outline:solid;float: left;height:480px;width:300px;">'
                + '</div>',

      // Default ID is read-only, module_id is changeable
      def_id    : 'testmodule',
      module_id : 'testmodule',

      settable_map: {
        module_id : true
      }
    },
    stateMap = {
      $append_target  : null,
      pre_color       : null
    },
    jqueryMap = {},
    setJqueryMap,
    configModule, initModule,
    getModuleId,
    configRender;
//================= END MODULE SCOPE VARIABLES ===============

//------------------- BEGIN UTILITY METHODS ------------------
// Begin Utility method /configMiniColor/
  configRender = function () {

  };
// End Utility method /configMiniColor/
//==================== END UTILITY METHODS ===================

//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var
      $append_target = stateMap.$append_target;
    jqueryMap = {

    };
  };
// End DOM method /setJqueryMap/
//====================== END DOM METHODS =====================

//------------------- BEGIN EVENT HANDLERS -------------------
// Begin Event handler /onColorPick/
// End Event handler /onColorPick/
//==================== END EVENT HANDLERS ====================

//------------------- BEGIN PUBLIC METHODS -------------------
// Begin public method /configModule/
//
  configModule = function ( input_map ) {
    prjX.util.setConfigMap({
      input_map : input_map,
      settable_map : configMap.settable_map,
      config_map : configMap
    });
    return true;
  };
// End public method /configModule/

// Begin public method /initModule/
// Purpose   : Initializes module
//
  initModule = function ($append_target) {
    stateMap.$append_target = $append_target;
    $append_target.append(configMap.main_html);
    // assign id to the lasted child element, that is this module itself
    $append_target.children().last().attr('id', configMap.module_id);
    $append_target.children().last().html(configMap.module_id);
    setJqueryMap();
  };
// End public method /initModule/

  getModuleId = function () {
    return configMap.def_id;
  };

// return public methods
  return {
    configModule: configModule,
    initModule  : initModule,
    getModuleId : getModuleId
  };
//=================== END PUBLIC METHODS =====================
}());
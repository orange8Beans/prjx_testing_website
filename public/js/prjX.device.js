/**
 * Created by cczhang on 13/2/2015.
 */
/*
 * File : prjX.device.js
 * Main : prjX
 * Type : Shell feature module
 * Sub  : Device interpreter
 */
/*jslint          node : true, continue : true,
 devel  : true, indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white  : true
 */
/*global $, prjx */
prjX.device = (function () {
  'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {},
    stateMap = {},
    jqueryMap = {},
    setJqueryMap, configModule, initModule;
//================= END MODULE SCOPE VARIABLES ===============

//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
//==================== END UTILITY METHODS ===================

//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
// End DOM method /setJqueryMap/
//====================== END DOM METHODS =====================

//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
//==================== END EVENT HANDLERS ====================

//------------------- BEGIN PUBLIC METHODS -------------------
// Begin public method /configModule/
// Purpose   : Adjust configuration of allowed keys
// Arguments : A map of settable keys and values
//   * color_name - color to use
// Settings  :
//   * configMap.settable_map declares allowed keys
// Returns   : true
// Throws    : none
//
  configModule = function () {

  };
// End public method /configModule/

// Begin public method /initModule/
// Purpose   : Initializes module
// Arguments :
//    *  the jquery element used by this feature
// Returns   : true
// Throws    : non-accidental
//
  initModule = function () {

  };
// End public method /initModule/

// return public methods
  return {
    configModule: configModule,
    initModule  : initModule
  };
//=================== END PUBLIC METHODS =====================
}());
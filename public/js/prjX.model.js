/**
 * Created by cczhang on 12/2/2015.
 */
/*
 * File : prjX.model.js
 * Main : prjX
 * Type : Model module
 */
/*jslint          node : true, continue : true,
 devel  : true, indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white  : true
 */
/*global $, prjx */
prjX.model = (function () {
  'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {

    },
    stateMap = {},
    jqueryMap = {},

    isFakeData = false,
    sio,
    deviceDemo, // This is a Demo LED
    configModule, initModule;

  // Modular dependency
  sio = prjX.data.getSio();
//================= END MODULE SCOPE VARIABLES ===============

//------------------- BEGIN UTILITY METHODS ------------------
//==================== END UTILITY METHODS ===================

//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
//==================== END EVENT HANDLERS ====================

//------------------- BEGIN PUBLIC METHODS -------------------
///////////////////////////////////
// Begin public object /deviceDemo/
  deviceDemo = (function () {
    var
      update_color;

    update_color = function ( cmd ) {
      if( sio ) {
        console.log([cmd.tgt, cmd.cmd, cmd.lod]);
        sio.emit('updatecolor', cmd);
      }
    };

    return {
      update_color  :  update_color
    };
  }());

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
    initModule  : initModule,
    ////////////////////////////
    deviceDemo  : deviceDemo
  };
//=================== END PUBLIC METHODS =====================
}());
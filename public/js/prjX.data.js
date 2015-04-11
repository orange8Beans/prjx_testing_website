/**
 * Created by cczhang on 12/2/2015.
 */
/*
 * File : prjX.data.js
 * Main : prjX
 * Type : Data module
 */
/*jslint          node : true, continue : true,
 devel  : true, indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white  : true
 */
/*global $, prjx */
prjX.data = (function () {
  'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    stateMap = { sio : null },
    makeSio, getSio,
    configModule, initModule;
//================= END MODULE SCOPE VARIABLES ===============

//------------------- BEGIN UTILITY METHODS ------------------
// Begin Utility method /makeSio/
  makeSio = function () {
    var socket = io.connect( '/prjX' ); // Configured io namespace
    return {
      emit : function ( event_name, data ) {
        socket.emit( event_name, data );
      },
      on   : function ( event_name, callback ) {
        socket.on( event_name, function () {
          callback( arguments );
        });
      }
    };
  };
// End Utility method /makeSio/
//==================== END UTILITY METHODS ===================

//--------------------- BEGIN DOM METHODS --------------------
//====================== END DOM METHODS =====================

//------------------- BEGIN EVENT HANDLERS -------------------
//==================== END EVENT HANDLERS ====================

//------------------- BEGIN PUBLIC METHODS -------------------
// Begin public method /getSio/
  getSio = function () {
    if ( ! stateMap.sio ) { stateMap.sio = makeSio(); }
    return stateMap.sio;
  };
// End public method /getSio/

// Begin public method /configModule/
// Purpose   : Adjust configuration of allowed keys
// Arguments : A map of settable keys and values
//   * color_name - color to use
// Settings  :
//   * configMap.settable_map declares allowed keys
// Returns   : true
// Throws    : none
//
  configModule = function () {};
// End public method /configModule/

// Begin public method /initModule/
// Purpose   : Initializes module
// Arguments :
//    *  the jquery element used by this feature
// Returns   : true
// Throws    : non-accidental
//
  initModule = function () {};
// End public method /initModule/

// return public methods
  return {
    getSio       : getSio,
    configModule : configModule,
    initModule   : initModule
  };
//=================== END PUBLIC METHODS =====================
}());
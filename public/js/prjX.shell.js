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
      main_html : String()
                    + '<div id="rgb-value"></div>'
    },
    stateMap = {
      $container  : undefined,
      anchor_map  : {}
    },
    jqueryMap = {},
    setJqueryMap,
    onTinyColorPick,
    configModule, initModule;
  //////////////////////////////////
  // Move to separate module later
  //////////////////////////////////
  var device_led = prjX.model.deviceDemo;
//================= END MODULE SCOPE VARIABLES ===============

//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
//==================== END UTILITY METHODS ===================

//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
//
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container    : $container,
      $rgb_value    : $container.find('#rgb-value')
    };
  };
// End DOM method /setJqueryMap/
//====================== END DOM METHODS =====================

//------------------- BEGIN EVENT HANDLERS -------------------
// Begin Event handler /onTinyColorPick/
  onTinyColorPick = function ( event, rgb_value ) {
    jqueryMap.$rgb_value.text('Select LED color: ' + rgb_value);
    /////////////////////////////////////////
    device_led.update_color(rgb_value);
  };
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
  initModule = function ($container) {

    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();

    // configure and initialize feature modules
    prjX.colorPicker.initModule( jqueryMap.$container );

    // subscribe to feature modules' events
    $.gevent.subscribe( $container, 'tiny-colorpicked', onTinyColorPick );

  };
// End public method /initModule/

// return public methods
  return {
    configModule: configModule,
    initModule  : initModule
  };
//=================== END PUBLIC METHODS =====================
}());
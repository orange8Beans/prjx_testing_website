/**
 * Created by ChengCheng on 2015/2/12.
 */
/*
 * File : prjX.colorPicker.js
 * Main : prjX
 * Type : Shell feature module
 * Sub  : Tiny Color Picker
 */
/*jslint          node : true, continue : true,
 devel  : true, indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white  : true
 */
/*global $, prjx */
prjX.colorPicker = (function () {
  'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
                  + '<div id="tinyColorPicker">'
                    + '<a class="tcp_color">'
                      + '<div class="tcp_colorInner"></div>'
                    + '</a>'
                    + '<div class="tcp_track"></div>'
                    + '<ul class="tcp_dropdown">'
                      + '<li></li>'
                    + '</ul>'
                    + '<input type="hidden" class="tcp_colorInput"/>'
                  + '</div>'
    },
    stateMap = {
      $append_target  : null,
      pre_color       : null
    },
    jqueryMap = {},
    setJqueryMap,
    onColorPick, verifyChange,
    configModule, initModule;
//================= END MODULE SCOPE VARIABLES ===============

//------------------- BEGIN UTILITY METHODS ------------------
// Begin Utility method /verifyChange/
  verifyChange = function ( rgb_value ) {
    /// Check whether the color really changed
    var _pre_color = stateMap.pre_color;
    if ( rgb_value === _pre_color) {
      return false;
    }
    if ( rgb_value !== _pre_color ) {
      stateMap.pre_color = rgb_value;
      return true;
    }
  };
// End Utility method /verifyChange/
//==================== END UTILITY METHODS ===================

//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var
      $append_target = stateMap.$append_target;
    jqueryMap = {
      $tiny_color : $append_target.find('#tinyColorPicker')
    };
  };
// End DOM method /setJqueryMap/
//====================== END DOM METHODS =====================

//------------------- BEGIN EVENT HANDLERS -------------------
// Begin Event handler /onColorPick/
//
  onColorPick = function ( rgb_value ) {
    if ( verifyChange(rgb_value) ) {
      $.gevent.publish( 'tiny-colorpicked' , rgb_value );
    }
    else {}
  };
// End Event handler /onColorPick/
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
  initModule = function ($append_target) {
    var
      $list_box, color_box;
    stateMap.$append_target = $append_target;
    $append_target.append(configMap.main_html);
    setJqueryMap();

    // init color picker box
    jqueryMap.$tiny_color.tinycolorpicker();
    color_box = jqueryMap.$tiny_color.data("plugin_tinycolorpicker");
    color_box.setColor("#ff0000");
    // Register color-change events to events handlers
    jqueryMap.$tiny_color.bind("change", function()
    {
      onColorPick(color_box.colorRGB);
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
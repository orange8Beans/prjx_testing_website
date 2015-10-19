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
prjX.stg_module = (function () {
  'use strict';
  var
    hireMaker;
  // Factory
  // to make sub-factory for modules
  //
  hireMaker = function (input_map) {
    var
      makeModule,

      config_map = {
        main_html   :  String()
                      + '<div class="" style="position:relative;outline:solid;float: left;height:480px;width:300px;">'
                      +   '<div class="module-closer"><span style="vertical-align:middle;display: inline-block;"></span></div>'
                      +   '<label for="hidden-input"></label>'
                      + '</div>',
        class       : '',
        pre_func    : null,
        rd_func     : null,

        settable_map: {
          main_html: true,
          class    : true,

          pre_func : true,
          rd_func  : true
        }
      },
      config_mod;


    config_mod = function (_input_map) {
      prjX.util.setConfigMap({
        input_map   : _input_map,
        settable_map: config_map.settable_map,
        config_map  : config_map
      });
      return true;
    };

    // Configure the module templates with the hireMaker first
    config_mod(input_map);


    // sub-factory
    // to make individual modules
    //
    makeModule = function (_input_map) {
      var
        _id,
        configMap = {
          main_html   :  config_map.main_html,
          class       :  config_map.class,
          id          : '',

          pre_func    : config_map.pre_func,
          rd_func     : config_map.rd_func,

          settable_map: {
            main_html   : true,
            id          : true,
            pre_func    : true,
            rd_func     : true
          }
        },

        stateMap = {
          $append_target : null,
          $module_dom  : null,

          temp_html      : null,
          pre_flag       : false
        },

        jqueryMap = {},
        setJqueryMap,
        configModule,

        init,
        getId,  getDom, setLabel, setText,
        detach, attach, remove,

        //saveContent, backContent, clearContent,

        preConfig, get_preFlag, set_preFlag, setEvent,
        configRender;

      configModule = function (input_map) {
        prjX.util.setConfigMap({
          input_map   : input_map,
          settable_map: configMap.settable_map,
          config_map  : configMap
        });
        return true;
      };

      setJqueryMap = function () {
        var
          $append_target = stateMap.$append_target,
          $module_dom  = stateMap.$module_dom;
        jqueryMap = {
          $append_target: $append_target,
          // Stage Module
          $module_dom : $module_dom
        };
      };

      // module configuration during creation of module
      configModule(_input_map);
      // Generate a random module id if _module_id is undefined
      _id = configMap.id;
      if( _id === '' ) {
        configMap.id = configMap.class + '_' + Math.floor(Math.random() * 100) + 1;
      }
      else {
        configMap.id = configMap.class + '_' + _id;
      }

      // Configure render function
      preConfig = configMap.pre_func || function () {};
      configRender = configMap.rd_func || function () {};

      // Create a DOM for the stage module, and set it's attributes
      // and it's temp html to show
      //
      stateMap.$module_dom = $(configMap.main_html);
      stateMap.$module_dom.attr({
        class: configMap.class,
        id   : configMap.id
      });

      //stateMap.$module_dom.html(configMap.id);

      // Public Method /detach/
      // Detach DOM from the container, only if the container exists
      detach = function () {
        if (stateMap.$append_target) {
          stateMap.$module_dom.detach();
        }
        else {
          return false;
        }
      };

      remove = function () {
        if (stateMap.$append_target) {
          stateMap.$module_dom.remove();
        }
        else {
          return false;
        }
      };
      // /detach/

      // Public Method /attach/
      // Attach DOM to the container
      attach = function () {
        // With _$con parameter or without
        //if (_$con == stateMap.$append_target ) {
        //  _$con.append(stateMap.$module_dom);
        //}
        if ( stateMap.$append_target ) {
          stateMap.$append_target.append(stateMap.$module_dom);
        }
        else {
          return false;
        }
      };
      // /attach/

      get_preFlag = function () {
        return stateMap.pre_flag;
      };

      set_preFlag = function (_flag) {
        if(_flag == true || _flag == false) {
          stateMap.pre_flag = _flag;
        }
      };

      // Set event-DOM
      setEvent = function ($dom, event) {

      };

// End public method /configModule/

// Begin public method /initModule/
// Purpose   : Initializes module
//
      init = function ($append_target) {

        stateMap.$append_target = $append_target;

        setJqueryMap();
      };

      getId = function () {
        return configMap.id;
      };

      // Return the module's DOM back
      getDom = function () {
        return stateMap.$module_dom;
      };

      // Set the label of the module's DOM
      setLabel = function (label_str) {
        this.getDom().find('label').text(label_str);
      };

      setText = function ($item, label_str) {
        if ( $item == null ) {
          $item = 'label';
        }
        this.getDom().find($item).text(label_str);
      };

      return {
        //configModule: configModule,
        init        : init,

        configRender: configRender,
        preConfig   : preConfig,
        get_preFlag : get_preFlag,
        set_preFlag : set_preFlag,
        setEvent    : setEvent,

        getId       : getId,
        getDom      : getDom,
        setLabel    : setLabel,
        setText     : setText,

        detach      : detach,
        attach      : attach,
        remove      : remove
      };

    };

    return {
      makeModule : makeModule
    };

  };

  return {
    hireMaker  : hireMaker
  };

}());
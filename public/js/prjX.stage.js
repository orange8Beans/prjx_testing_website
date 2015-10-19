/**
 * Created by cczhang on 12/2/2015.
 */
/*
 * File : prjX.stage.js
 * Main : prjX
 * Type : Shell module Stage
 */
/*jslint          node : true, continue : true,
 devel  : true, indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white  : true
 */
/*global $, prjx */
prjX.stage = (function () {
  'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    getTrimmedString, foo,

    stateMap = {
      current_stage : null,
      current_flag   : true
    },
    current_stage,
    makeStage
    ;
//================= END MODULE SCOPE VARIABLES ===============

//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
  getTrimmedString = function (str, del, start) {
    var _str = str,
      tokens = _str.split(del).slice(0,1);

    return tokens[0];
  };
  foo = function (arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
      if ( arr[i] !== prev ) {
        a.push(arr[i]);
        b.push(1);
      } else {
        b[b.length-1]++;
      }
      prev = arr[i];
    }

    return [a, b];
  };
//==================== END UTILITY METHODS ===================

//--------------------- BEGIN DOM METHODS --------------------
//====================== END DOM METHODS =====================

//------------------- BEGIN EVENT HANDLERS -------------------
// Begin Event handler /onTinyColorPick/
//==================== END EVENT HANDLERS ====================

//------------------- BEGIN PUBLIC METHODS -------------------
// /makeStage/
// make and return a stage object
// Public methods:
//  * add() - add a shell feature stage module into the stage list
//  * remove() - remove a module from the stage list
//  * show() - show the stage
//  * hide() - hide the stage list
//  * shut() - clear the stage list
//  $ get_modules() - get the current modules list in this stage
  makeStage = function ( _input_map ) {
    var
      _id,
      configMap = {
        main_html   : String()
                      + '<div class="" style="height:480px;">'
                      + '</div>',
        class       : 'sub-stage',
        id          : '',

        settable_map: {
          id          : true,
          main_html   : true
        }
      },

      stateMap = {
        $append_target : null,
        $stage_dom  : null,

        temp_html      : null
      },

      jqueryMap = {},
      setJqueryMap,
      configModule,

      _id_list = [],
      _id_dict = {},
      init_list,

      init, getId, getDom,
      add, remove,
      show, hide, shut,
      that;

// Module Util Methods
//
    configModule = function (input_map) {
      prjX.util.setConfigMap({
        input_map    : input_map,
        settable_map : configMap.settable_map,
        config_map   : configMap
      });
      return true;
    };

    setJqueryMap = function () {
      var
        $append_target = stateMap.$append_target,
        $stage_dom  = stateMap.$stage_dom;
      jqueryMap = {
        $append_target: $append_target,
        // Stage Module
        $stage_dom : $stage_dom
      };
    };

    init_list = function (list) {
      var _idx;
      for (_idx=0; _idx < list.length; _idx +=1) {
        add(list[_idx]);
      }
    };
// End Util Methods

    // module configuration during creation of module
    configModule(_input_map);
    // Generate a random module id if _module_id is undefined
    _id = configMap.id;
    if( _id === '' ) {
      configMap.id = configMap.class + '_' + Math.floor(Math.random() * 100) + 1;
    }
    else {
      //configMap.id = configMap.class + '_' + _id;
      configMap.id = _id;
    }

    // Create a DOM for the stage module, and set it's attributes
    // and it's temp html to show
    //
    stateMap.$stage_dom = $(configMap.main_html);
    stateMap.$stage_dom.attr({
      class: configMap.class,
      id   : configMap.id
    });
    //stateMap.$stage_dom.html(configMap.id);

// Public Method /show/ /hide/
//
    hide = function () {
      if (stateMap.$append_target) {
        stateMap.$stage_dom.detach();
      }
      else {
        return false;
      }
    };

    shut = function () {
      if (stateMap.$append_target) {
        stateMap.$stage_dom.remove();
      }
      else {
        return false;
      }
    };

    show = function () {
      if ( stateMap.$append_target ) {

        // If current stage exists, hide its content
        if (current_stage && current_stage != this) {
          current_stage.hide();
        }
        current_stage = this;

        stateMap.$append_target.append(stateMap.$stage_dom);

        var
          _len = _id_list.length,
          _idx;
        for (_idx=0; _idx<_len; _idx+=1) {
          _id_dict[_id_list[_idx]].configRender();
          // if haven't run preConfig, do run it
          if ( _id_dict[_id_list[_idx]].get_preFlag() == false ) {
            _id_dict[_id_list[_idx]].preConfig();
            _id_dict[_id_list[_idx]].set_preFlag(true);
          }
        }

        return _id_list;
      }
      else {
        return false;
      }
    };
// /show/ /hide/

// Public Methods
// /init/ :
//
    init = function ( $container, m_list ) {
      // assign this stage object to that
      that = this;
      stateMap.$append_target = $container;
      setJqueryMap();

      // Initialize modules list if there are input list
      if(m_list) {
        init_list(m_list);
      }
    };

    add = function (module) {
      _id = module.getId();
      // check whether the module ID exists in the dictionary
      // init the module only if the module exists and the Stage DOM exists
      if ( !_id_dict[_id] )
      {
        if ( module && jqueryMap.$stage_dom ) {
          _id_dict[_id] = module;
          _id_list.push(_id);
          module.init(jqueryMap.$stage_dom);
          module.attach();

          // bind event-DOM events
          // remove the module upon click ('module-closer') event
          module.getDom().find(".module-closer").on('click', function () {
            that.remove(module.getId());
          });
        }
        else {
          return false;
        }
      }
      // return false if:
      // add an existing module
      // the module doesn't exist
      // stage DOM hasn't been init
      else {
        return false;
      }
    };

    remove = function (_id) {
      // return false if the list is empty
      if (_id_list.length === 0 ) {
        return false;
      }

      // remove module DOM with according id
      // and remove from the module list
      if (_id) {
        if ( _id_dict[_id] ) {

          //_id_dict[_id].remove();
          _id_dict[_id].detach();

          delete _id_dict[_id];

          var _idx = _id_list.indexOf(_id);
          if ( _idx !== -1 ) {
            _id_list.splice(_idx, 1);
          }
        }
        else {
          return false;
        }
      }
      // otherwise remove the last module DOM in the list
      // and don't forget remove from the module list
      else {
        var
          _len = _id_list.length - 1,
          _key = _id_list[_len];

        //_id_dict[_key].remove();
        _id_dict[_key].detach();
        delete  _id_dict[_key];
        _id_list.pop();
      }
    };

    getId = function () {
      return configMap.id;
    };

    // Return the module's DOM back
    getDom = function () {
      return stateMap.$stage_dom;
    };
//

    return {
      init        : init,

      getId       : getId,
      getDom      : getDom,
      add         : add,
      remove      : remove,
      show        : show,
      hide        : hide,
      shut        : shut
    };
  };
//  /makeStage/

// return public methods, objects
  return {
    makeStage       : makeStage
  };
//=================== END PUBLIC METHODS =====================
}());
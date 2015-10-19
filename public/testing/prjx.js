/**
 * Created by HP on 12/20/14.
 */
var prjX = (function () {
//------------------ BEGIN MODULE SCOPE VARIABLES --------------------------
  var
    configMap = {
      default_html : '<div id="prjx-template">'
                      + 'Hello Here!'
                      +'This is prjX-template!'
                    + '</div>',
      template_url : 'template.html',
      template_selector: 'prjx-template',
      text_color_active: 'rgb(255, 0, 0)',
      text_color_inactive: 'rgb(0, 255, 0)'
    },
    stateMap = {
      $container : null,
      is_text_inactive: true
    },
    jqueryMap = {},
    setJqueryMap, toggleText, onClickText, initModule;
//------------------ END MODULE SCOPE VARIABLES --------------------------

//------------------ BEGIN DOM METHODS --------------------------
// Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;
    var $text = stateMap.$container.find('#prjx-template');
    jqueryMap = {
      $container: $container,
      $text : $text
    };
  };
// End DOM method /setJqueryMap/

// Begin DOM method /toggleText/
  toggleText = function (do_active, callback) {
    var
      text_color = jqueryMap.$text.css('color');
      is_active = (text_color === configMap.text_color_active);
      is_inactive = (text_color === configMap.text_color_inactive);
      is_changing = (!is_active) && (!is_inactive);

    if (is_changing === true) {
      return false;
    }

    if(do_active){
      jqueryMap.$text.css('color', configMap.text_color_active);
      stateMap.is_text_inactive = false;
      if(typeof callback === 'function') {
        callback(jqueryMap.$text);
      }
      return true;
    }

    else {
      jqueryMap.$text.css('color', configMap.text_color_inactive);
      stateMap.is_text_inactive = true;
      if(typeof callback === 'function') {
        callback(jqueryMap.$text);
      }
      return true;
    }
  };
// End DOM method /toggleText/
//------------------ END DOM METHODS --------------------------

//------------------ BEGIN EVENT HANDLERS --------------------------
// Begin event handler /onClickText/
  onClickText = function (event) {
    toggleText(stateMap.is_text_inactive);
    return false;
  };
// End event handler /onClickText/
//------------------ END EVENT HANDLERS --------------------------

//------------------ BEGIN PUBLIC METHODS --------------------------
  initModule = function ($container) {
    //$container.load(configMap.template_url + ' #' + configMap.template_selector);
    // It seems that load have loading time problems.
    $container.html(configMap.default_html);
    stateMap.$container = $container;
    // Set Jquery Containers
    setJqueryMap();
    jqueryMap.$text.css('color', configMap.text_color_inactive);
    // Bind event handler
    jqueryMap.$text.click(onClickText);
  };

  return {
    initModule: initModule
  };
//------------------ END PUBLIC METHODS --------------------------
})();




/**
 * Created by HP on 12/20/14.
 */

//------------------ BEGIN MODULE SCOPE VARIABLES --------------------------

//------------------ END MODULE SCOPE VARIABLES --------------------------

//------------------ BEGIN DOM METHODS --------------------------

//------------------ END DOM METHODS --------------------------

//------------------ BEGIN EVENT HANDLERS --------------------------
//------------------ END EVENT HANDLERS --------------------------


//------------------ BEGIN PUBLIC METHODS --------------------------

//------------------ END PUBLIC METHODS --------------------------

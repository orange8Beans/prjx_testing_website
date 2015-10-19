/**
**/
"use strict";

var v100  =  (function() {
//------------------ BEGIN MODULE SCOPE VARIABLES --------------------------
  var initModule;
//------------------ END MODULE SCOPE VARIABLES --------------------------

  initModule = function ($append_target) {
    v100.Utils.init();
    v100.Terminal.init($append_target);
  };
//------------------ BEGIN EXPOSE MODULES --------------------------
  return {
    Core : {},
    initModule : initModule
  };
//------------------ END EXPOSE MODULES  --------------------------

}());



/**
 Copyright 2014 Gordon Williams (gw@pur3.co.uk)

 This Source Code is subject to the terms of the Mozilla Public
 License, v2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
 
 ------------------------------------------------------------------
  Initialisation code
 ------------------------------------------------------------------
**/
"use strict";

var prjXX  =  (function() {
//------------------ BEGIN MODULE SCOPE VARIABLES --------------------------
  var initModule;
//------------------ END MODULE SCOPE VARIABLES --------------------------

  initModule = function () {
    prjXX.Core.Utils.init();
    prjXX.Core.Terminal.init();
  };
//------------------ BEGIN EXPOSE MODULES --------------------------
  return {
    Core : {},
    initModule : initModule
  };
//------------------ END EXPOSE MODULES  --------------------------

}());



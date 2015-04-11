/**
 * Created by cczhang on 13/2/2015.
 */
/*
 * Module       : messaging.js
 * Description  : to provide real-time messaging
 * Dependency   : socket.io,
 *                ./dongle;
 *
 */
/*
 * messaging.js - module to provide real-time messaging
 * Dependency:
 * socket.io,
 */
/*jslint          node : true, continue : true,
 devel  : true, indent : 2,      maxerr : 50,
 newcap : true,  nomen : true, plusplus : true,
 regexp : true, sloppy : true,     vars : false,
 white  : true
 */
/*global */
'use strict';
// ------------ BEGIN MODULE SCOPE VARIABLES --------------
var
  socket = require( 'socket.io'),
  dongle = require( './dongle' ),
  msgObj;
// ============= END MODULE SCOPE VARIABLES ===============

// --------------- BEGIN UTILITY METHODS ------------------

// ================ END UTILITY METHODS ===================

// ---------------- BEGIN PUBLIC METHODS ------------------
msgObj = {
  connect  :  function (server, serialPort) {
    var
      io = socket.listen( server ),
      temp;
    // Begin to setup
    io
      .of('/prjX')
      .on( 'connection', function ( socket ) {
        // Begin /updatecolor/ message handler
        socket.on( 'updatecolor', function ( data ) {
          temp = dongle.create_cmd(0x07, data);
          //temp = dongle.sendCmd(data);
          console.log(data);
          console.log( temp );
          /// Testing purpose serialPort
          serialPort.write( temp, function() {

          });
        });
        // End /updatecolor/ message handler
      }
    );
    // End io setup
    return io;
  }
};
module.exports = msgObj;
// ================= END PUBLIC METHODS ===================

// ------------- BEGIN MODULE INITIALIZATION --------------
// ============== END MODULE INITIALIZATION ===============
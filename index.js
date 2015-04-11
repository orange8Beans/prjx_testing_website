/*
 serialToRest
 a node.js app to read take requests and reply with serial data
 */
//------------------ BEGIN PUBLIC VARIABLES --------------------------
var serialport = require("serialport"),		// include the serialport library
    SerialPort = serialport.SerialPort,	   // make a local instance of serial
    //express = require('express'),				   // make an instance of express
    //app = express();								   // start Express framework
    app = require('express')();
var portName = process.argv[2];  // the third word of the command line command is serial port name:
var portNum = 80;
//------------------ END PUBLIC VARIABLES --------------------------

//------------------ BEGIN PUBLIC INITIALIZATIONS --------------------------
// print out the port you're listening on:
console.log("opening serial port: " + portName);
// Create server
// serve-static module is required to implement CSS and jQuery!
var server = require('http').createServer(app),
    io = require('socket.io')(server),
    serveStatic = require('serve-static');

app.use(serveStatic(__dirname));
//app.listen(portNum);
// listen for incoming requests on the server:
server.listen(portNum);
console.log("Listening for new clients on port " + portNum);

/*
io.on('connection', function(socket) {
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', function (data) {
    console.log(data.my);
  });
});*/

// open the serial port. Uses the command line parameter:
var myPort = new SerialPort(portName, {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  // look for return and newline at the end of each data packet:
  parser  : serialport.parsers.readline("\r\n")
//  parser: serialport.parsers.readline(">")
});
//------------------ END PUBLIC INITIALIZATIONS --------------------------

//------------------ BEGIN EVENT DRIVEN METHODS --------------------------
/* The rest of the functions are event-driven. 
 * They only get called when the server gets incoming GET requests:
 */
// Begin method /sendIndexPage/
// send the index page to client quest;
//
function sendIndexPage(request, response) {
  response.sendfile(__dirname + '/index.html');
}
// End method /sendIndexPage/

// Begin method /getAnalogReading/
// get an analog reading from the serial port:
//
function getAnalogReading(request, response) {
  // the first parameter after /analog/ is the channel number:
  // TTTest add a '#' for music player testing
//  var addCharHead = '$@';
//  var addCharEnd = '#';
  var splitData = request.params[0].split('>>');
//  var channel = addCharHead + splitData[0] + addCharEnd;
  var channel = splitData[0];
  var replySwitch = splitData[1];
  // TTTest End
  // var channel = request.params[0];
  //console.log("sending data: " + channel + "...");

  // send it out the serial port and wait for a response:
  //channel = channel + "\r\n";
//  myPort.write(channel, function() {
//		// send an HTTP header to the client:
//		response.writeHead(200, {'Content-Type': 'text/html'});
//    // TTTest, end response immediately aftder write data.
//    if (replySwitch === "Device Reply Disabled") {
//    // ..This is needed if the SerialDevice don't reply.
//    response.end();
//    }
//    // TTTest End
//    else {
//		// when you get a response from the serial port, write it out to the client:
//		myPort.on('data', function(data) {
//  	  		// send the data and close the connection:
//  	  		response.write(data);
//          console.log("receiving dta: " + data );
//  	  		response.end();
//  	  	});
//    }
//
//  });
  /*
  myPort.write(channel , function () {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('Device: ' + dataFromDevice.fetch_data());
    response.end();
  });*/
}
// End method /getAnalogReading/

// Begin method
// Update data from device.
// Note: Now using socket.io, it is real time!
//
io.on('connection', function(socket) {
  socket.emit('news', {hello: 'Hello from PjrX Serial-Server'});
  socket.on('my other event', function (data) {
    console.log(data.my);
    // Update data From Browser
    myPort.write(data.my, function(){
    });
  });
  // When the serialPort is on
  myPort.on('data', function (data) {
    // Remove '>' sign
    if(data[0] === '>') data = data.substring(1, data.length);
    console.log('Device: ' + data);
    // Update data From Device.
    socket.emit('news', {hello: data});
    // Update data From Device.
    dataFromDevice.update_data(data);
  });
});
// End method

// Begin method /dataFromDevice/
// Update data from device.
//
var dataFromDevice = (function () {
  var data = "";
  var fetch_data = function() {
    return data;
  };
  var update_data = function(new_data) {
    data = new_data;
  };

  return {
    fetch_data : fetch_data,
    update_data: update_data
  };
})();
// End method /dataFromDevice/
//------------------ END EVENT DRIVEN METHODS --------------------------

// respond to web GET requests with the index.html page:
app.get('/', sendIndexPage);

// take anything that begins with /output:
app.get('/analog/*', getAnalogReading);
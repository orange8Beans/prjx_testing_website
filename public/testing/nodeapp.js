var connect = require('connect');
var serveStatic = require('serve-static');
var port = 80;
var app = connect();
app.use(serveStatic(__dirname));
//app.use(serveStatic('public'));
app.listen(port);
console.log('Connected via port '+port);
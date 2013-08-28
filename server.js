//var app = require('harp').server(__dirname, { port: process.env.PORT || 5000 }),
//    io = require('socket.io').listen(app);
    
/*    Harp.io 
var express = require("express");
var harp = require("harp");
var app = express();

app.configure(function(){
    app.use(express.static(__dirname + "/public"));
    app.use(harp.pipeline(__dirname + "/public"));
});

// routes as normal
*/

/* Socket.io
var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
*/

var express = require("express"),
    harp = require("harp"),
    app = express(),
    io = require("socket.io").listen(app),
    port = process.env.PORT || 5000;

app.configure(function(){
    app.use(express.static(__dirname + "/public"));
    app.use(harp.pipeline(__dirname + "/public"));
});

app.listen(port);
    
console.log("Server started");
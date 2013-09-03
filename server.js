var express = require('express');
var app = express();
var server = require('http').Server(app);
//var io = require('socket.io').listen(server);

app.get('/', function(req, res){
    console.log("serving the client.html");
    res.sendfile('client.html');
});

var PORT = process.env.PORT || 5000;
server.listen(PORT);
console.log("Server started on port" + PORT);

/* Socket.io Stuff ***********************************************************/

// Heroku compatibility
//io.configure(function () { 
//  io.set("transports", ["xhr-polling"]);
//  io.set("polling duration", 10);
//});

//io.on('connection', function(socket){
//    console.log("Connection started.");
//    
//    socket.on('join', function(data){
//        //console.log(data);
//        io.sockets.emit('joined', data);
//    });
//    
//    socket.on('say', function(data){
//        //console.dir(data);
//        io.sockets.emit('hear', data);
//    });
//    
//    socket.on('disconnect', function(data) {
//        //console.log("Connection stopped.");
//        io.sockets.emit('left', data);
//    });
//});
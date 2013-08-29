var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var harp = require("harp");

var PORT = process.env.PORT || 5000;

app.configure(function(){
    
    // Harp integration
    app.use(express.static(__dirname + "/public"));
    app.use(harp.pipeline(__dirname + "/public"));
});

// Heroku compatibility
io.configure(function () { 
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

io.on('connection', function(socket){
    console.log("Connection started.");
    
    socket.on('join', function(data){
        //console.log(data);
        io.sockets.emit('joined', data);
    });
    
    socket.on('say', function(data){
        //console.dir(data);
        io.sockets.emit('hear', data);
    });
    
    socket.on('disconnect', function(data) {
        //console.log("Connection stopped.");
        io.sockets.emit('left', data);
    });
});

server.listen(PORT);

console.log("Server started on port " + PORT);
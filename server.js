var app = require('harp').server(__dirname, { port: process.env.PORT || 5000 }),
    io = require('socket.io').listen(app);
    
console.log("Server started");
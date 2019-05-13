var express = require('express');

var app = express();
var server = app.listen(3000);


// var history = [];

app.use(express.static('public'));

console.log("server is running on port 3000");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
console.log('new connection: ' + socket.id);

socket.on("mouse", mouseMsg);

function mouseMsg(data) {
    //emit sends the data to all users except the user that sent it
    socket.broadcast.emit("mouse", data);
    //console log the data
    console.log(data);
    // history.push(data);
    // console.log(history[1]);
    // io.socket.emit("mouse", data);  global
}

}

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

// io.on('connection', (socket) => {
//     socket.broadcast.emit('hi');
//   });

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//     });
// });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});

//------------------------------------------------------------

// Node server which will handle socket io connection
// const io = require('socket.io')(8000)

// const users = {};

// io.on('connection', socket => {
//     socket.on('new-user-joined', name => {
//         console.log("Success");
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     })

//     socket.on('send', message => {
//         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
//     });

//     // socket.on('disconnect', message => {
//     //     socket.broadcast.emit('left', users[socket.id]);
//     //     delete users[socket.id];
//     // });

// })
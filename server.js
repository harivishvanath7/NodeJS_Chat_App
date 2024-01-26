const path = require('path');
const http = require('http')
const express = require('express');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Setting the static folder (i.e, "/public")
app.use(express.static(path.join(__dirname, 'public')));

// Runs when client connects
io.on('connection', socket => {

    // Welcome current user
    socket.emit('message', 'Welcome to ChatCord!!')

    // Broadcast whan a user connects
    socket.broadcast.emit('message', 'A User has joined the chat')

    // Runs when client Disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', msg)
    })
    
})

const PORT = 3000 || process.env.PORT;
server.listen(PORT, ()=> console.log(`Server Running on port ${PORT}`));
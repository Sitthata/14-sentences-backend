const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.Server(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const port = 8080;

const room = new Map();

app.get('/', (_, res) => {
    res.send("Server is running");
});

io.on('connection', (socket) => {
    console.log('User connected');
    // Create a new lobby
    socket.on('createLobby', (username) => {
        const roomCode = Math.floor(Math.random() * 1000000);
        room.set(roomCode, {users: [{id: socket.id, username}]});
        socket.join(roomCode);
        socket.emit('lobbyCreated', roomCode);
        console.log(room);
    });
    // Join an existing lobby
    socket.on('joinLobby', (roomCode, username) => {
        if (!room.has(roomCode)) socket.emit('lobbyNotFound', 'This lobby does not exist');
        else {
            const existingUsers = room.get(roomCode).users;
            existingUsers.push({id: socket.id, username});
            // update the room
            room.set(roomCode, {users: existingUsers});
            socket.join(roomCode);
            socket.emit('lobbyJoined', roomCode, existingUsers);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

})

server.listen(port, () => console.log(`Listening on port ${port}`));
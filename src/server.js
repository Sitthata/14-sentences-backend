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
        const users = [{id: socket.id, username}];
        room.set(roomCode.toString(), { users });
        socket.join(roomCode);
        socket.emit('lobbyCreated', roomCode, users);
        room.forEach((value, key) => console.log(`Room: ${key}, Users: ${value.users}`));
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
    socket.on('getRoomInfo', (roomCode) => {
        console.log(`getRoomInfo event received for room: ${roomCode}`);
        if (!room.has(roomCode)) socket.emit('lobbyNotFound', 'This lobby does not exist');
        else {
            const users = room.get(roomCode).users;
            socket.emit('roomInfo', users);
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

})

server.listen(port, () => console.log(`Listening on port ${port}`));
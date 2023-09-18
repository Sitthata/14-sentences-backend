const roomMap = require('./roomMap');

function handleSocketEvents(socket) {
  console.log("User connected");
  
  socket.on("createLobby", (username) => {
    const roomCode = Math.floor(Math.random() * 1000000);
    const users = [{ id: socket.id, username }];
    roomMap.set(roomCode.toString(), { users });
    socket.join(roomCode);
    socket.emit("lobbyCreated", roomCode, users);
    roomMap.forEach((value, key) =>
      console.log(`Room: ${key}, Users: ${value.users}`)
    );
  });

  socket.on("joinLobby", (roomCode, username) => {
    if (!roomMap.has(roomCode))
      socket.emit("lobbyNotFound", "This lobby does not exist");
    else {
      const existingUsers = roomMap.get(roomCode).users;
      existingUsers.push({ id: socket.id, username });
      roomMap.set(roomCode, { users: existingUsers });
      socket.join(roomCode);
      socket.emit("lobbyJoined", roomCode, existingUsers);
    }
  });

  socket.on("getRoomInfo", (roomCode) => {
    console.log(`getRoomInfo event received for room: ${roomCode}`);
    if (!roomMap.has(roomCode))
      socket.emit("lobbyNotFound", "This lobby does not exist");
    else {
      const users = roomMap.get(roomCode).users;
      socket.emit("roomInfo", users);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
}

module.exports = handleSocketEvents;

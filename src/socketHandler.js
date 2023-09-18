const roomMap = require("./roomMap");
const debugMode = true; // Set to true to enable debug output, false to disable it

function logDebug(message) {
  if (debugMode) {
    console.log(message);
  }
}

function handleSocketEvents(socket) {
  socket.on("createLobby", (username) => {
    logDebug("Received 'createLobby' event");
    const roomCode = Math.floor(Math.random() * 1000000);
    logDebug(`Generated room code: ${roomCode}`);

    const users = [{ id: socket.id, username }];
    logDebug("Created users array with the current user");

    roomMap.set(roomCode.toString(), { users });
    logDebug(`Added room with code ${roomCode} to roomMap`);

    socket.join(roomCode);
    logDebug(`User joined room: ${roomCode}`);

    socket.emit("lobbyCreated", roomCode, users);
    logDebug(`Emitted 'lobbyCreated' event with room code and users`);

    roomMap.forEach((value, key) =>
      logDebug(`Room: ${key}, Users: ${JSON.stringify(value.users)}`)
    );
  });

  socket.on("joinLobby", (roomCode, username) => {
    logDebug("Received 'joinLobby' event");
    if (!roomMap.has(roomCode)) {
      logDebug("Lobby not found");
      socket.emit("lobbyNotFound", "This lobby does not exist");
    } else {
      logDebug(`Joining lobby with code: ${roomCode}`);
      const existingUsers = roomMap.get(roomCode).users;
      existingUsers.push({ id: socket.id, username });
      roomMap.set(roomCode, { users: existingUsers });
      socket.join(roomCode);
      logDebug(`User joined room: ${roomCode}`);
      socket.emit("lobbyJoined", roomCode, existingUsers);
      logDebug(`Emitted 'lobbyJoined' event with room code and existing users`);
    }
  });

  socket.on("getRoomInfo", (roomCode) => {
    logDebug("Received 'getRoomInfo' event");
    logDebug(`Getting room info for room: ${roomCode}`);

    if (!roomMap.has(roomCode)) {
      logDebug("Lobby not found");
      socket.emit("lobbyNotFound", "This lobby does not exist");
    } else {
      const users = roomMap.get(roomCode).users;
      socket.emit("roomInfo", users);
      logDebug(`Emitted 'roomInfo' event with users`);
    }
  });

  socket.on("disconnect", () => {
    logDebug("User disconnected");
  });
}

module.exports = handleSocketEvents;

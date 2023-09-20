const { roomMap } = require("./roomMap");
const { logDebug } = require("../logDebug");

function joinLobby(socket, roomCode, username, io) {
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

    io.in(roomCode).emit("roomInfo", existingUsers);
    logDebug(`Emitted 'lobbyJoined' event with room code and existing users`);
  }
}

exports.joinLobby = joinLobby;
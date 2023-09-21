const { roomMap } = require("./roomMap");
const { logDebug } = require("./logDebug");

const MAX_USERS_PER_LOBBY = 12;

function joinLobby(socket, roomCode, username, io) {
  logDebug("Received 'joinLobby' event");
  if (!roomMap.has(roomCode)) {
    logDebug("Lobby not found");
    socket.emit("lobbyNotFound", "This lobby does not exist");
  } else {
    const existingUsers = roomMap.get(roomCode).users;
    if (existingUsers.length >= MAX_USERS_PER_LOBBY) {
      logDebug("Lobby is full");
      socket.emit("maxUserLimitReached", "This lobby is full");
      return;
    } else {
      logDebug(`Joining lobby with code: ${roomCode}`);
      existingUsers.push({ id: socket.id, username });
      roomMap.set(roomCode, { users: existingUsers });
      socket.join(roomCode);
      logDebug(`User joined room: ${roomCode}`);
      socket.emit("lobbyJoined", roomCode, existingUsers);
      io.in(roomCode).emit("roomInfo", existingUsers);
      logDebug(`Emitted 'lobbyJoined' event with room code and existing users`);
    }
  }
}

exports.joinLobby = joinLobby;

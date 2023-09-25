const { logDebug} = require("./_lobbyHandle/logDebug");
const { createLobby } = require("./_lobbyHandle/createLobby");
const { joinLobby } = require("./_lobbyHandle/joinLobby");
const { handleDisconnect } = require("./_lobbyHandle/handleDisconnect");
const {handleKeyword } = require("./_lobbyHandle/handleKeyword")
const { roomMap, logRoomInfo } = require("./_lobbyHandle/roomMap.js");

function handleSocketEvents(socket, io) {
  socket.on("createLobby", (username) => {
    createLobby(socket, username);
  });

  socket.on("joinLobby", (roomCode, username) => {
    joinLobby(socket, roomCode, username, io);
  });

  socket.on("getRoomInfo", (roomCode) => {
    getRoomInfo(socket, roomCode);
  });

  socket.on("disconnect", () => {
    handleDisconnect(socket);
  });

  socket.on("submitKeyword", (roomCode, {goodKeyword, badKeyword}) => {
    handleKeyword(socket, roomCode, {goodKeyword, badKeyword});
  })
}

function getRoomInfo(socket, roomCode) {
  logDebug("Received 'getRoomInfo' event");
  logDebug(`Getting room info for room: ${roomCode}`);
  logRoomInfo();

  if (!roomMap.has(roomCode)) {
    logDebug("Lobby not found");
    socket.emit("lobbyNotFound", "This lobby does not exist");
  } else {
    const users = roomMap.get(roomCode).users;
    socket.emit("roomInfo", users);
    logDebug(`Emitted 'roomInfo' event with users`);
  }
}

module.exports = handleSocketEvents;

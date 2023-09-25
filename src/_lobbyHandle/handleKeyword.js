// handleKeyword.js
const { logDebug } = require("./logDebug");
const { roomMap } = require("./roomMap");

function handleKeyword(socket, roomCode, payload) {
  if (!roomMap.has(roomCode)) {
    socket.emit("lobbyNotFound", "This lobby does not exist");
    logDebug("lobby not found.")
  } else {
    const room = roomMap.get(roomCode);
    const user = room.users.find((user) => user.id === socket.id);

    if (user) {
      user.ownWord = [payload.goodKeyword, payload.badKeyword];
      logDebug(`Adding keyword to user ${user.id} in room ${room}`);
      socket.emit("OwnwordReceived", user.ownWord)
    } else {
      socket.emit("playerNotFound", roomCode);
      logDebug("Player not found")
    }
  }
}

exports.handleKeyword = handleKeyword;

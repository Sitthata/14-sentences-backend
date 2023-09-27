const { roomMap } = require("./roomMap");
const { logDebug } = require("./logDebug");
const disconnectUserMap = require("./handleDisconnect");

function handleReconnect(socket) {
  if (!disconnectUserMap.has(socket.id)) {
    logDebug("User doesn't exists");
  } else {
    const userData = disconnectUserMap.get(socket.id);
    const [roomCode, username] = userData;

    if (roomMap.has(roomCode)) {
      socket.join(roomCode);
      logDebug(`User ${username} reconnected to room ${roomCode}.`);
      roomMap.set(roomCode, username);
      socket.emit("userReconnected", roomMap.get(roomCode))
    } else {
      logDebug(`User ${username} no longer exists.`);
    }
  }
}

exports.handleReconnect = handleReconnect;

const { logDebug } = require("./logDebug");
const { roomMap } = require("./roomMap");
const { removeRoomCode } = require("./roomCodeGenerator");
const disconnectUserMap = new Map();

function handleDisconnect(socket) {
  logDebug("User disconnected");

  roomMap.forEach((value, key) => {
    if (value.users.some((user) => user.id === socket.id)) {
      disconnectUserMap.set(socket.id, {key, value})
      value.users = value.users.filter((user) => user.id !== socket.id);

      if (value.users.length === 0) {
        removeRoomCode(key);
        logDebug(`Removed room with code ${key} as there are no users`);
      }
    }
  });
}

module.exports = {
  handleDisconnect,
  disconnectUserMap
};

const { logDebug } = require("./logDebug");
const { roomMap } = require("./roomMap");
const { removeRoomCode } = require("./roomCodeGenerator");

function handleDisconnect(socket) {
  logDebug("User disconnected");

  roomMap.forEach((value, key) => {
    if (value.users.some((user) => user.id === socket.id)) {
      value.users = value.users.filter((user) => user.id !== socket.id);

      if (value.users.length === 0) {
        removeRoomCode(key);
        logDebug(`Removed room with code ${key} as there are no users`);
      }
    }
  });
}

exports.handleDisconnect = handleDisconnect;

const roomMap = new Map();
const { logDebug } = require("../logDebug");

function logRoomInfo() {
  roomMap.forEach((value, key) =>
    logDebug(`Room: ${key}, Users: ${JSON.stringify(value.users)}`)
  );
}

module.exports = { roomMap, logRoomInfo };

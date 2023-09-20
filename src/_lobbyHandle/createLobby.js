const { roomMap, logRoomInfo } = require("./roomMap");
const { logDebug } = require("./logDebug");
const {
    generateUniqueRoomCode
  } = require("./roomCodeGenerator");
  

function createLobby(socket, username) {
    logDebug("Received 'createLobby' event");
    const roomCode = generateUniqueRoomCode();
    logDebug(`Generated room code: ${roomCode}`);
  
    const users = [{ id: socket.id, username }];
    logDebug("Created users array with the current user");
  
    roomMap.set(roomCode.toString(), { users });
    logDebug(`Added room with code ${roomCode} to roomMap`);
  
    socket.join(roomCode);
    logDebug(`User joined room: ${roomCode}`);
  
    socket.emit("lobbyCreated", roomCode, users);
    logDebug(`Emitted 'lobbyCreated' event with room code and users`);
  
    logRoomInfo(roomMap);
  }

  exports.createLobby = createLobby;
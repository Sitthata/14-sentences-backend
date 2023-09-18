const usedRoomCodes = new Set();

const generateUniqueRoomCode = () => {
  let roomCode;
  do {
    roomCode = Math.random().toString(36).substr(2, 5).toUpperCase();
  } while (usedRoomCodes.has(roomCode));

  usedRoomCodes.add(roomCode);
  return roomCode;
};

const removeRoomCode = (code) => {
  usedRoomCodes.delete(code);
};

module.exports = {
  generateUniqueRoomCode,
  removeRoomCode,
};

const usedRoomCodes = new Set(); 

const roomCodeGenerator = () => {
    let roomCode;
    do {
        roomCode = Math.random().toString(36).substr(2, 5).toUpperCase();
    } while (usedRoomCodes.has(roomCode)); 

    usedRoomCodes.add(roomCode); 
    return roomCode;
}

const uniqueRoomCode = roomCodeGenerator();
console.log(uniqueRoomCode);

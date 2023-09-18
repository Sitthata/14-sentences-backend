// socketHandler.js
const { roomMap } = require("./roomMap");

function handleConnection(socket) {
  console.log("User connected");

  socket.on("createLobby", (username) => {
    const roomCode = Math.floor(Math.random() * 1000000);
    const users = [{ id: socket.id, username }];
    roomMap.set(roomCode.toString(), { users });
    socket.join(roomCode);
    socket.emit("lobbyCreated", roomCode, users);
    roomMap.forEach((value, key) =>
      console.log(`Room: ${key}, Users: ${value.users}`)
    );
  });

  socket.on("joinLobby", (roomCode, username) => {
    const room = roomMap.get(roomCode.toString());

    if (room) {
      room.users.push({ id: socket.id, username });
      socket.join(roomCode);
      socket.emit("lobbyJoined", roomCode, room.users);
    } else {
      socket.emit("lobbyNotFound");
    }
  });

  socket.on("getRoomInfo", (roomCode) => {
    const room = roomMap.get(roomCode.toString());

    if (room) {
      socket.emit("roomInfo", roomCode, room.users);
    } else {
      socket.emit("lobbyNotFound");
    }
  });

  socket.on("disconnect", () => {
    let userRoom = null;

    roomMap.forEach((room, roomCode) => {
      const foundUser = room.users.find((user) => user.id === socket.id);

      if (foundUser) {
        userRoom = { roomCode, users: room.users };
      }
    });

    if (userRoom) {
      const updatedUsers = userRoom.users.filter(
        (user) => user.id !== socket.id
      );
      roomMap.set(userRoom.roomCode, { users: updatedUsers });
      socket.leave(userRoom.roomCode);
      console.log(
        `User ${socket.id} disconnected from room ${userRoom.roomCode}`
      );
    }
  });
}

module.exports = { handleConnection };

// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.Server(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = 8080;

const { handleConnection } = require("./socketHandler");

server.listen(port, () => console.log(`Listening on port ${port}`));

io.on("connection", handleConnection);

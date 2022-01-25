const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const rooms = new Map();

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

app.post("/rooms", (req, res) => {
  console.log("hello rooms123123");
});

io.on("connection", (socket) => {
  console.log("user connected   ", socket.id);
});

server.listen(9999, (error) => {
  if (error) {
    throw Error(error);
  }
  console.log("Server started");
});

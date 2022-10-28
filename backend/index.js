const PORT = process.env.PORT || 3001;
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user has connected");
  socket.on("disconnect", () => {
    console.log("this user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
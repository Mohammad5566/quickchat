const PORT = 4000;
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.use((socket, next) => {
  username = socket.handshake.headers["username"];
  password = socket.handshake.headers["password"];
  if (username === "test" && password == "test") {
    next();
    console.log("Authenticated user");
  } else {
    next(new Error());
    console.log("Failed to authenticate user");
  }
});

io.on("connection", (socket) => {
  console.log("A user has connected");
  socket.on("disconnect", () => {
    console.log("this user disconnected");
  });

  console.log(socket.id);

  socket.on("chat message", (id, msg) => {
    console.log(msg);
    io.emit("chat message", id, msg);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

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
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  // if existing session not found, create new session
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  socket.emit("chat session", socket.sessionID, socket.userID);

  socket.join(socket.userID);

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

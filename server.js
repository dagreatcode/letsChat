require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const options = {
  /* ... */
};
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.json(__dirname, "./client/build/index.html"));
});

io.on("connection", (socket) => {
  socket.emit("your id", socket.id);
  socket.on("send message", (body) => {
    io.emit("message", body);
  });
  console.log("made connection");
});

server.listen(PORT, () => console.log(`Server started on ${PORT} on http://localhost:${PORT}`));

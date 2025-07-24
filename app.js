const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let chatHistory = [];
let creatorSocketId = null;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send chat history on join
  socket.emit('chat history', chatHistory);

  // When someone creates the chat
  socket.on('create chat', () => {
    creatorSocketId = socket.id;
  });

  // When someone sends a message
  socket.on('chat message', (msg) => {
    chatHistory.push(msg);

    if (socket.id === creatorSocketId) {
      // Broadcast to all except creator
      socket.broadcast.emit('creator message', msg);
    } else {
      // Send reply to creator only
      io.to(creatorSocketId).emit('chat message', msg);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

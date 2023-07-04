const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*',
  }
});

io.on('connection', socket => {
  console.log('A new client has connected!');
  
  socket.on('disconnect', () => {
    console.log('The client has disconnected!');
  });
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
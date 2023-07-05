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

function randomInRange(min, max) {
  return min + (Math.random() * (max - min));
}

io.on('connection', socket => {
  console.log('A new client has connected!');

  setTimeout(() => {
    socket.emit('GREETING', {
      from: 'Joe',
      text: 'Hello I am here to help you. What is your question?',
      sentAt: new Date(),
      isUnread: true,
    });
  }, randomInRange(1500, 4000));

  socket.on('NEW_MESSAGE', message => {
    setTimeout(() => {
      socket.emit('MESSAGE_READ');
    }, randomInRange(1000, 3000));

    setTimeout(() => {
      socket.emit('IS_TYPING', 'Joe');
    }, randomInRange(3000, 5000));

    setTimeout(() => {
      socket.emit('NEW_MESSAGE', {
        from: 'Joe',
        text: 'That\'s a great question! Let me get someone to help you.',
        sentAt: new Date(),
        isUnread: true,
      });
    }, randomInRange(5000, 6000));
  })

  
  socket.on('disconnect', () => {
    console.log('The client has disconnected!');
  });
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
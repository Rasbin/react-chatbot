const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuid } = require('uuid');

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

let conversations = {};

io.on('connection', socket => {
  const existingClientId = socket.handshake.query.id;
  let clientId;
  
  if (existingClientId) {
    console.log('An existing client has joined with id ' + existingClientId);
    clientId = existingClientId;
    const existingMessages = conversations[existingClientId];
    
    if (existingMessages) {
      socket.emit('EXISTING_MESSAGES', existingMessages);
    }
  } else {
    console.log('A new client has connected!');
    const newClientId = uuid();
    clientId = newClientId;
    socket.emit('ID_ASSIGNED', newClientId);
  
    setTimeout(() => {
      const newMessage = {
        from: 'Joe',
        text: 'Hello I am here to help you. What is your question?',
        sentAt: new Date(),
        isUnread: true,
      };
  
      socket.emit('GREETING', newMessage);
      conversations[newClientId] = [newMessage];
    }, randomInRange(1500, 4000));
  }
  

  socket.on('NEW_MESSAGE', newMessage => {
    conversations[clientId] = conversations[clientId]
      ? conversations[clientId].concat(newMessage)
      : [newMessage];
    console.log(conversations);

    setTimeout(() => {
      socket.emit('MESSAGE_READ');
    }, randomInRange(1000, 3000));

    setTimeout(() => {
      socket.emit('IS_TYPING', 'Joe');
    }, randomInRange(3000, 5000));

    setTimeout(() => {
      const newMessage = {
        from: 'Joe',
        text: 'That\'s a great question! Let me get someone to help you.',
        sentAt: new Date(),
        isUnread: true,
      }

      socket.emit('NEW_MESSAGE', newMessage);

      conversations[clientId].push(newMessage);
    }, randomInRange(5000, 6000));
  })

  
  socket.on('disconnect', () => {
    console.log('The client has disconnected!');
  });
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const router = require('./route');

app.use('/login',router);

app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const users = [];

io.on('connection', (socket) => {

 

  const randomUserName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

  
  users.push(randomUserName);
  socket.client.userName = randomUserName;

  console.log('a user connected');

  socket.on('disconnect', () => {
    io.emit('anounce', ` ${socket.client.userName} has quit`);
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('get message', [msg, socket.client.userName]);
    console.log(`message ${msg} from ${socket.client.userName}`);
  });

  io.emit('anounce', `welcome ${socket.client.userName} to group chat`);

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
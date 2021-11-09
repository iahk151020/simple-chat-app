const http = require('http');
const { Server } = require("socket.io");
const app = require('./index').app;
// const session = require('./index').session;
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);
const sessionMW = require('./index').sessionMW;

let sockets = [];

io.use((socket, next) => {
  sessionMW(socket.request, {}, next);
})

io.on('connection', (socket) => {
  
  const username = socket.request.session.user.username;
  console.log(`a user  connected`);
  socket.on('disconnect', () => {
    io.emit('anounce', ` ${null} has quit`);
    console.log('user disconnected');
  
  });

  socket.on('chat message', (msg) => {
    io.emit('get message', [msg, socket.client.userName]);
  });

  io.emit('anounce', `welcome ${username} to group chat`);

});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
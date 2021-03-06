var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected!');
  socket.on('chat message', msg => {
      console.log('message: ', msg);
      io.emit('chat message', msg);
  })
  socket.on('disconnect', () => {
      console.log('A user has disconnected!');
  })
});

http.listen(3000, () => {
    console.log('listening on port: 3000');
});
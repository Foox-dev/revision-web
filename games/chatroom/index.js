const app = require('express')();
const server = require('http').Server(app) //run the server on app
const io = require('socket.io')(server); //run our server on socket.io

const port = 3000;
server.listen(port, ()=> {
  console.log(`Server is listening on Port: ${port}`)
});

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/public/index.html')
});

app.get('/phyton', (req, res)=> {
  res.sendFile(__dirname + '/public/phyton.html')
});

app.get('/javascript', (req, res)=> {
  res.sendFile(__dirname + '/public/javascript.html')
});

app.get('/swift', (req, res)=> {
  res.sendFile(__dirname + '/public/swift.html')
});

const tech = io.of('/tech');

tech.on('connection', (socket)=>{
  // console.log('A user connected')
  socket.on('join', (data) => {
    socket.join(data.room);
    tech.in(data.room).emit('message', `New User Joiner ${data.room} root!`)
  });

  socket.on('message', (data)=> {
    tech.in(data.room).emit('message', data.msg);
    console.log(data)
  });

  io.on('disconnect', ()=> {
    console.log('User Disconnected')
    tech.emit('message', 'User Disconnected')
  })

});

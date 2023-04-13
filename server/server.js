import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router/route.js';

import {Server} from "socket.io"
import { createServer } from 'http';

import socketController from './controllers/videochatController.js'

const app = express(); 
const server = createServer(app); 
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  

/*middleware*/
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 5000;

/*HTTP requests */
app.get('/', (req, res) =>{
    res.status(201).json("Home GET request");
});


/*api request */
app.use('/api', router)

io.on("connection", (socket) =>{
    console.log(`User connected: ${socket.id}`)
    
    socket.emit('me', socket.id)

    socket.on('calluser',({userToCall, signalData, from, name}) =>{
        io.to(userToCall).emit('calluser', {signal: signalData, from, name})
    })

    socket.on('answercall', (data) =>{
        io.to(data.to).emit("callaccepted", data.signal)
    })

    socket.on("join_room", (data) => {
        //console.log(data)
        socket.join(data)
    })

    socket.on("send_message", (data) =>{
        socket.to(data.room).emit("receive_message", data)
        //socket.broadcast.emit("receive_message", data)
    })

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
})

server.listen(port, ()=>{
    console.log(`Server connection to http://localhost:${port}`);
});
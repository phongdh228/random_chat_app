import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router/route.js';

import {Server} from "socket.io"
import { createServer } from 'http';

const app = express(); 
const server = createServer(app); 
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
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

// app.set('view engine', 'ejs')
// app.use(express.static('public'))

/*HTTP requests */
app.get('/', (req, res) =>{
    res.status(201).json("Home GET request");
});

/*api request */
app.use('/api', router)

io.on("connection", (socket) =>{
    console.log(`User connected: ${socket.id}`)
    
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


/*start server only when have valid connection*/
// connect().then(() =>{
//     try{
//         app.listen(port, ()=>{
//             console.log(`Server connection to http://localhost:${port}`);
//         });
//     }
//     catch(err){
//         console.log("Cannot connect to server");
//     }
// }).catch(err =>{
//     console.log("Invalid database connection");
// })

server.listen(port, ()=>{
    console.log(`Server connection to http://localhost:${port}`);
});

//server.listen(port, '192.168.31.151')
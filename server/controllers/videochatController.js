import { v4 as uuidv4 } from 'uuid';
//import {io} from './../server.js'


export function connectToRoom(req, res){
    res.render("room", {roomId: req.params.room})
}

export function video(req, res){
    res.redirect(`${uuidv4()}`)
}

const respond = function(endpoint, socket_io){
    socket_io.on("video", function(video){
        // console.log(`User connected: ${socket.id}`)
        
        // video.on("join_room", (data) => {
        //     //console.log(data)
        //     socket.join(data)
        // })
    
        // video.on("send_message", (data) =>{
        //     socket.to(data.room).emit("receive_message", data)
        //     //socket.broadcast.emit("receive_message", data)
        // })
        endpoint.emit("recei_message",video);
    })
}

export default respond;

// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true
// }).then(stream => {

// })

// function addVideoStream(video, stream) {
//     video.srcObject = stream
//     video.addEventListener('loadedmetadata', () =>{
//         video.play()
//     })
// }
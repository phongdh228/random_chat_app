import { v4 as uuidv4 } from 'uuid';

export function connectToRoom(req, res){
    res.render("room", {roomId: req.params.room})
}

export function video(req, res){
    res.redirect(`${uuidv4()}`)
}

// export function connectSocket(req, res){
//     io.on('connect', socket=>{
//         socket.on('join-room', (roomId, userId)=>{
//             console.log(roomId, userId)
//         })
//     })
// }
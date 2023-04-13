import React from 'react';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

import { makeStyles } from '@mui/styles';

import VideoPlayer from './VideoPlayer.jsx';

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const useStyles = makeStyles((theme) => ({
  // appBar: {
  //   borderRadius: 15,
  //   margin: '30px 100px',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '600px',
  //   border: '2px solid black',

  //   [theme.breakpoints.down('xs')]: {
  //     width: '90%',
  //   },
  // },
  // image: {
  //   marginLeft: '15px',
  // },
  // wrapper: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   width: '100%',
  // },
}));

export default function Video() {
  const classes = useStyles();

  // const [room, setRoom] = useState("")

  // const [message, setMessage] = useState("");
  // const [messageReceived, setMessageReceived] = useState("")

  // const joinRoom = () => {
  //   if(room !== ""){
  //     socket.emit("join_room",room);
  //   }
  // }

  // const sendMessage = () => {
  //   socket.emit("send_message", {message, room})
  // };

  // useEffect(() => {
  //   socket.on("receive_message", (data) =>{
  //     setMessageReceived(data.message)
  //   })
  // })

  return(
    // <div className='container mx-auto'>
    //   <input placeholder='Room number...' onChange={(event) =>{
    //     setRoom(event.target.value);
    //   }}
    //   />
    //   <button onClick={joinRoom}> Join Room</button>
    //   <input placeholder='Message...' onChange={(event) =>{
    //     setMessage(event.target.value);
    //   }}
    //   />
    //   <button onClick={sendMessage}>Send Message</button>
    //   <h1>Message:</h1>
    //   {messageReceived}
    //   <div id="video-grid"></div>
    // </div>

      <div>
        <VideoPlayer/>
      </div>
  )
}

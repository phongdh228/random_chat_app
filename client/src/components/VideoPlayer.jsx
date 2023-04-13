import  React, { useContext }  from 'react';
import { Grid, Paper, Typography  } from '@mui/material';
import { makeStyles} from '@mui/styles';

import { SocketContext } from '../Context';


const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px'
    },
    gridContainer: {
      justifyContent: 'center',
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  }));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();

  if (stream) console.log('STREAM IS ON', stream)
  if (name) console.log('NAME IS ON', name)
  if (myVideo) console.log('myVideo IS ON', myVideo)


    return(
        <Grid container className={classes.gridContainer}>
            {/**Our own video */}
            {stream && (
                <Paper className={classes.paper}>
                    <Grid>
                        <Typography variant="h5" gutterBottom>{name ||'You'}</Typography>
                        <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
                    </Grid>
                </Paper> 
              )}
            
            {/**User's video */}
            {callAccepted && !callEnded && (
                <Paper className={classes.paper}>
                    <Grid>
                        <Typography variant="h5" gutterBottom>{call.name ||'Other User'}</Typography>
                        <video playsInline ref={userVideo} autoPlay className={classes.video}/>
                    </Grid>
                </Paper>
              )}
        </Grid>
    )
}

export default VideoPlayer
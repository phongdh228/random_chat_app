import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/*middleware*/
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8000;

/*HTTP requests */
app.get('/', (req, res) =>{
    res.status(201).json("Home GET request");
});

/*api request */
app.use('/api', router)


/*start server only when have valid connection*/
connect().then(() =>{
    try{
        app.listen(port, ()=>{
            console.log(`Server connection to http://localhost:${port}`);
        });
    }
    catch(err){
        console.log("Cannot connect to server");
    }
}).catch(err =>{
    console.log("Invalid database connection");
})


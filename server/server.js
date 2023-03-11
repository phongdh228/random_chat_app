import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

app.listen(port, ()=>{
    console.log(`Server connection to http://localhost:${port}`);
});
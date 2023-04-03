// import mongoose from "mongoose";

// import { MongoMemoryServer } from "mongodb-memory-server";

// async function connect(){
//     const mongodb = await MongoMemoryServer.create();
//     const getUri = mongodb.getUri();

//     const db = await mongoose.connect(getUri);
//     console.log("Database connected");
//     return db;
// }

// export default connect;

import { Client } from 'pg';

const dotenv = require('dotenv');
dotenv.config()

async function connect(){
    try{
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        });

        await client.connect();
        console.log('Database connection established');
        return client;
    }
    catch(error){
        console.log(error);
    }
}

export default connect;
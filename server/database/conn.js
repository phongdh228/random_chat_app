// import pkg from 'pg';

// const {Client} = pkg;

// async function connect(){
//         try{
//         const client = new Client({
//             user: process.env.PGUSER,
//             host: process.env.PGHOST,
//             database: process.env.PGDATABASE,
//             password: process.env.PGPASSWORD,
//             port: process.env.PGPORT
//         });

//         await client.connect();
//         console.log('Database connection established');
//         return client;
//     }
//     catch(error){
//             console.log(error);
//         }
//     }
    
//     export default connect;
import pkg from 'pg';
import  dotenv from 'dotenv';
dotenv.config();

const Pool = pkg.Pool;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

export default pool;
// module.exports =  pool;
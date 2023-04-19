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
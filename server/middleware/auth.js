import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/**auth middleware */
export default async function Auth(req, res, next) {
    try{

        //access authorize header
        const token = req.headers.authorization.split(" ")[1];

        //retrive the user details
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET_KEY);

        res.user = decodedToken;

        next();

    }catch(error){
        res.status(404).json({error: "Authentication failed"});
    }
}
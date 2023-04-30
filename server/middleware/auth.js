import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/**auth middleware */
export default async function Auth(req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];

        console.log("====token ne: " + token)

        //retrive the user details
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET_KEY);

        console.log(decodedToken)
        

        res.user = decodedToken;

        next();

    }catch(error){
        res.status(404).json({error: "Authentication failed"});
    }
}

export function localVariable(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSessions: false
    }
    next();
}
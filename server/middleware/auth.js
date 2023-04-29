import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/**auth middleware */
export default async function Auth(req, res, next) {
    try{

        if (res.user !== undefined) {
            console.log('===user property exists in res object and is not undefined')
            //res.user = decodedToken;

          } else {
            console.log('user property does not exist in res object or is undefined')
          }

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

export function localVariable(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSessions: false
    }
    next();
}
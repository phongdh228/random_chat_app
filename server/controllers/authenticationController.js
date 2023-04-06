import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import otpGenerator from 'otp-generator'

import pool from '../database/conn.js'
import  dotenv from 'dotenv';

const saltRounds = 10;
dotenv.config();

/*middleware for verify user */
export async function verifyUser(req, res, next) {
    try{
        const {username} = req.method == "GET" ? req.query : req.body;

        let exist = await pool.query(`SELECT * FROM users WHERE username = '${username}'`)
        if(!exist) {
            return res.status(404).send({error: "User not found"});
        }
        next();

    }catch(error){
        return res.status(404).send({error: "Authentication Error"})
    }
}

export async function register(req,res){
    try{
        const {username, password, email, fullname, birthday, is_male, is_active}= req.body;
        const isUnique = await checkForUniqFields(username, email);

        if (isUnique){
            if(password){
                bcrypt.hash(password, saltRounds, (err, hashedPassword) =>{
                    pool.query(`INSERT INTO users (username, password, email, fullname, birthday, is_male, is_active) VALUES ('${username}','${hashedPassword}','${email}','${fullname}','${birthday}','${is_male}','${is_active}')`)
                })
            }
            return res.status(200).send({msg: "User created successfully"});
        }
        else{
            return res.status(500).send({error: "Username or email already being taken"})
        }
    }catch(error){
        return res.status(500).send(error.message);
    }
}

export async function login(req,res){
   const {username, password} = req.body;

   try{
        const user = await findOneUserByUserName(username)

        //check if username exists
        if(user.length == 0)  return res.status(404).send({error: "User not found"})
        
        else {
            //compare password with the one stored in database
            const isMatch = await bcrypt.compare(password, user.password)

            if(isMatch){

                //create jwt token
                const token = jwt.sign({
                    userId: user._id,
                    username: user.username
                }, ENV.JWT_SECRET_KEY, {expiresIn: "24h"});

                return res.status(200).send({
                    msg: "Login successful",
                    username: user.username,
                    token
                });
            }
            else{
                return res.status(400).send({error: "Password is incorrect"});
            }
        }
   }catch(error){
        return res.status(500).send(error.message);
   }
}

export async function getUser(req,res){
    
    const {username} = req.params;

    try{
        if(!username) return res.status(501).send({error: "Invalid username"});

        const userInfo = await findOneUserByUserName(username)
        
        return res.status(201).send(userInfo);

    }catch(error){
        return res.status(404).send({erorr: "Cannot find user data"});
    }
}

export async function updateUser(req,res){
    try{
        const userId = req.query.id;
        console.log(userId);

        if(userId){
            const body = req.body;

            const { username, password, email, fullname, birthday, is_male, is_active } = req.body;

            let queryCommand = 'UPDATE users SET';
            let numFieldsUpdated = 0;

            if (username !== undefined) {
                queryCommand += ` username = '${username}'`;
                numFieldsUpdated++;
            }

            if (password !== undefined) {
                const hashedPassword = bcrypt.hashSync(password, saltRounds);
                queryCommand += `${numFieldsUpdated > 0 ? ',' : ''} password = '${hashedPassword}'`;
                numFieldsUpdated++;
            }

            if (email !== undefined) {
                queryCommand += `${numFieldsUpdated > 0 ? ',' : ''} email = '${email}'`;
                numFieldsUpdated++;
            }

            if (fullname !== undefined) {
                queryCommand += `${numFieldsUpdated > 0 ? ',' : ''} fullname = '${fullname}'`;
                numFieldsUpdated++;
            }

            if (birthday !== undefined) {
                queryCommand += `${numFieldsUpdated > 0 ? ',' : ''} birthday = '${birthday}'`;
                numFieldsUpdated++;
            }

            if (is_male !== undefined) {
                queryCommand += `${numFieldsUpdated > 0 ? ',' : ''} is_male = ${is_male}`;
                numFieldsUpdated++;
            }

            if (is_active !== undefined) {
                queryCommand += `${numFieldsUpdated > 0 ? ',' : ''} is_active = ${is_active}`;
                numFieldsUpdated++;
            }

            queryCommand += ` WHERE id = ${userId}`;

            pool.query(queryCommand)
            .then(() => {
                return res.status(200).send({msg: "Record updated successfully"})
            })
            .catch((error) => {
                return res.status(401).send(error.message);
            });
        }else{
            return res.status(401).send({erorr: "User not found"});
        }
    }catch(error){
        return res.status(401).send(error.message);
    }
}

export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:true,upperCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false})
    res.status(200).send({code: req.app.locals.OTP})
}

export async function verifyOTP(req,res){
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP) == parseInt(code)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;

        return res.status(200).send({msg: "Verify successfully"});
    }
    return res.status(400).send({erorr: "Invalid OTP code"});
}

export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
        return res.status(201).send({flag: req.app.locals.resetSessions})
    }
    return res.status(440).send({error: "Session Expired"});
}

export async function resetPassword(req,res){
    try{
        const {username, password} = req.body;

        const user = await findOneUserByUserName(username)

        if (!user) return res.status(404).send({error: "Username not found"});
        else{
            bcrypt.hash(password, saltRounds, (err, hashedPassword) =>{
                if(err) return res.status(500).send(err.message)
                
                pool.query(`UPDATE users SET password = '${hashedPassword}' WHERE username = '${username}'`)
            })
            return res.status(201).send({msg: "Password reset successfully"})
        }
     }catch(err){
        return res.status(401).send(err.message);
    }
}

async function checkForUniqFields(username, email){
    const checkForUsername = await findOneUserByUserName(username)
    const checkForEmail = await pool.query(`SELECT * FROM users WHERE email = '${email}'`)

    if(checkForUsername.length == 0 || checkForEmail.rows.length == 0) return true;
    return false;

}

async function findOneUserByUserName(username){
    const user = await pool.query(`SELECT * FROM users WHERE username = '${username}'`)
    return user.rows[0]
}
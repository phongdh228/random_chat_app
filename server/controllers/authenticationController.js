import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import otpGenerator from 'otp-generator'

import pool from '../database/conn.js'
import  dotenv from 'dotenv';

dotenv.config();

/*middleware for verify user */
export async function verifyUser(req, res, next) {
    try{
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        const {username} = req.method == "GET" ? req.query : req.body;

        //check if user exists
        console.log(username);
        let exist = await UserModel.findOne({username});
        if(!exist) {
            return res.status(404).send({error: "User not found"});
        }
        next();

    }catch(error){
        return res.status(404).send({error: "Authentication Error"})
    }
}

async function checkForUniqFields(username, email){
    const checkForUsername = await pool.query(`SELECT * FROM users WHERE username = '${username}'`)
    const checkForEmail = await pool.query(`SELECT * FROM users WHERE email = '${email}'`)

    if(checkForUsername.rows.length == 0 || checkForEmail.rows.length == 0) return true;
    return false;

}

export async function register(req,res){
    try{
        const {username, password, email, fullname, birthday, is_male, is_active}= req.body;
        const isUnique = await checkForUniqFields(username, email);

        if (isUnique){
            if(password){
                bcrypt.hash(password, 10, (err, hashedPassword) =>{
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
    UserModel.findOne({username})
        .then(user => {
            bcrypt.compare(password, user.password)
            .then(passwordCheck => {
                if(!passwordCheck) return res.status(400).send({error:"Dont have password"})

                //create JWT token
                const token = jwt.sign({
                    userId: user._id,
                    username: user.username
                }, ENV.JWT_SECRET_KEY, {expiresIn: "24h"});

                return res.status(200).send({
                    msg: "Login successful",
                    username: user.username,
                    token
                });

            })
            .catch(error => {
                return res.status(400).send({erorr: "Password is incorrect"});
            });
        })
        .catch(error => {
            return res.status(404).send({error: "User not found"});
        })
   }catch(error){
    return res.status(500).send(error);
   }
}

// export async function getAllUsers(req,res){    
//     try{
//        console.log("before getAllUsers")
//        const allUsers = await client.query(`SELECT * FROM users`)
//        console.log("after getAllUsers")
//        console.log(allUsers)
//        res.json(allUsers);

//     }catch(error){
//         return res.status(404).send({error: "Cannot find any user data"});
//     }
// }

// export async function testPOSTMethod(req,res){    
//     try{
//        const descriptions = req.body;
//        console.log(descriptions);
//        res.json(descriptions);

//     }catch(error){
//         return res.status(404).send({error: "Cannot find any data"});
//     }
// }

export async function getUser(req,res){
    
    const {username} = req.params;

    try{
        if(!username) return res.status(501).send({error: "Invalid username"});

        const userInfo = await pool.query(`SELECT * FROM users WHERE username = '${username}'`);
        
        return res.status(201).send(userInfo.rows);

    }catch(error){
        return res.status(404).send({erorr: "Cannot find user data"});
    }
}

export async function updateUser(req,res){
    try{

        // const id = req.query.id;
        const {userId} = req.user;

        if(userId){

            const body = req.body;
            //update date
            UserModel.updateOne({_id: userId}, body, function(err, data){
                if(err) throw err;

                return res.status(201).send({msg: "Record updated successfully"})
            });

        }else{
            return res.status(401).send({erorr: "User not found"});
        }

    }catch(error){
        return res.status(401).send({erorr});
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

        try{

            UserModel.findOne({username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({username: user.username},{ password: hashedPassword}, function(err,data) {
                                if(err) throw err;
                                return res.status(201).send({msg: "Record updated"})
                            });
                        })
                        .catch(e => {
                            return res.status(500).send({error: "Unable to hash password"});
                        });
                })
                .catch(error => {
                    return res.status(404).send({error: "Username not found"});
                })

        }catch(error){
            return res.status(500).send({error});
        }

    }catch(err){
        return res.status(401).send({err});
    }
}
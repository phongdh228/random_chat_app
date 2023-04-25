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
        const {username, password, email}= req.body;
        const isUnique = await checkForUniqFields(username, email);

        // if(place_of_birth === 'undefined') place_of_birth = ''
        // if(current_place === 'undefined') current_place = ''
        // if(zodiac_sign === 'undefined') zodiac_sign = getZodiacSign(birthday);

        if (isUnique){
            if(password){
                bcrypt.hash(password, saltRounds, (err, hashedPassword) =>{
                    pool.query(`INSERT INTO users (username, password, email) VALUES ('${username}','${hashedPassword}','${email}')`)
                    console.log("Inserted data to database")
                })
            }
            return res.status(200).send({msg: "User created successfully"});
        }
        else{
            return res.status(501).send({error: "Username or email already being taken"})
        }
    }catch(error){
        return res.status(500).send(error.message);
    }
}

export async function login(req,res){
    console.log(req.body)
    const {username, password} = req.body;

   try{
        const user = await findOneUserByUserName(username)

        //check if username exists
        if(user.length == 0 || user ===  "undefined" )  return res.status(404).send({error: "User not found"})
        
        else {
            //compare password with the one stored in database
            const isMatch = await bcrypt.compare(password, user.password)

            if(isMatch){

                //create jwt token
                const token = jwt.sign({
                    userId: user.id,
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
    console.log(req.params)
    console.log(req.body)
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
        console.log("start updating")
        const userId = req.query.id;
        console.log(userId);

        if(userId){
            const body = req.body;

            const { username, password, email, fullname, birthday, is_male, is_active, place_of_birth, current_place, zodiac_sign } = req.body;

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

            if (place_of_birth !== undefined) {
                queryCommand += `${numFieldsUpdated > 0 ? ',' : ''} place_of_birth = '${place_of_birth}'`;
                numFieldsUpdated++;
            }

            if (current_place !== undefined) {
                queryCommand += `${numFieldsUpdated > 0 ? ',' : ''} current_place = '${current_place}'`;
                numFieldsUpdated++;
            }

            if (zodiac_sign !== undefined) {
                queryCommand += `${numFieldsUpdated > 0 ? ',' : ''} zodiac_sign = '${zodiac_sign}'`;
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

export async function updateUserHobbies(req,res){
    try{
        const userId = req.query.id;
        console.log(userId);
        console.log(req.body)
        if(userId){
            let userOldInterest = await pool.query(`SELECT ARRAY_AGG(interest_id) as interest
            FROM user_interests
            WHERE user_id = ${userId}`)
        
            console.log(userOldInterest.rows[0].interest) //get interest list

            var userMatchedPoint = "00000000000000000000000";
            for (var i = 0; i < userOldInterest.rows[0].interest.length; i++){
                userMatchedPoint.charAt(userOldInterest.rows[0].interest[i]) = "1";
            }

            res.send(userOldInterest.rows)
            
        }else{
            return res.status(401).send({erorr: "User not found"});
        }
        

     }catch(err){
        return res.status(401).send(err.message);
    }
}

export async function checkUsernamePasswordUniqness(req,res){
    const {username, email} = req.body;
    const checker = await checkForUniqFields(username, email)

    if (checker) {
        return res.status(201).send({msg: "Username and Email are available to register"});
    }
    return res.status(200).send({msg: "Username and Email were being used"});

    
}

async function checkForUniqFields(username, email){
    const checkForUsername = findOneUserByUserName(username)

    const checkForEmail = await pool.query(`SELECT * FROM users WHERE email = '${email}'`)

    if(checkForUsername === "undefined" ||checkForEmail.rows === "undefined" || checkForUsername.length==0 || checkForEmail.rows.length == 0) return true;
    return false;
}

// export async function findOneUserByUserNameTest(req,res){
//     const {username} = req.body
//     const user = await pool.query(`SELECT * FROM users WHERE username = '${username}'`)
//     res.send(user.rows[0])
// }

async function findOneUserByUserName(username){
    const user = await pool.query(`SELECT * FROM users WHERE username = '${username}'`)
    return user.rows[0]
}

function getZodiacSign(birthday) {
    const [year, month, day] = birthday.split('-').map(Number);
    const date = new Date(year, month - 1, day);
  
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }
  
    const monthDay = month * 100 + day;
  
    if (monthDay >= 321 && monthDay <= 419) {
        return 'Aries';
    } else if (monthDay >= 420 && monthDay <= 520) {
        return 'Taurus';
    } else if (monthDay >= 521 && monthDay <= 620) {
        return 'Gemini';
    } else if (monthDay >= 621 && monthDay <= 722) {
        return 'Cancer';
    } else if (monthDay >= 723 && monthDay <= 822) {
        return 'Leo';
    } else if (monthDay >= 823 && monthDay <= 922) {
        return 'Virgo';
    } else if (monthDay >= 923 && monthDay <= 1022) {
        return 'Libra';
    } else if (monthDay >= 1023 && monthDay <= 1121) {
        return 'Scorpio';
    } else if (monthDay >= 1122 && monthDay <= 1221) {
        return 'Sagittarius';
    } else if ((monthDay >= 1222 && monthDay <= 1231) || (monthDay >= 101 && monthDay <= 119)) {
        return 'Capricorn';
    } else if (monthDay >= 120 && monthDay <= 218) {
        return 'Aquarius';
    } else {
        return 'Pisces';
    }
}

function convertMatchPointToString(matchPoint) {
    return matchPoint.join("");
}
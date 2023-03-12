import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/*middleware for verify user */
export async function verifyUser(req, res, next) {
    try{

        const {username} = req.method == "GET" ? req.query : req.body;

        //check if user exists
        let exist = await UserModel.findOne({username});
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
        const {username, password, profile, email}= req.body;

        //check the exsiting user
        const existUsername = new Promise((resolve, reject) =>{
            UserModel.findOne({username}, function(err, user){
                if(err) reject(new Error(err));
                if(user) reject({error: "Please use unique username"});

                resolve();
            })
        })

        const existEmail = new Promise((resolve,reject) =>{
            UserModel.findOne({email}, function(err, email){
                if(err) reject(new Error(err));
                if(email) reject({error: "Please use unique email"});

                resolve();
            })
        })

        Promise.all([existUsername, existEmail])
        .then(()=>{
            if(password){
                bcrypt.hash(password, 10)
                .then(hashedPassword => {

                    const user = new UserModel({
                        username,
                        password: hashedPassword,
                        profile: profile || '',
                        email
                    })

                    user.save()
                    .then(result => res.status(201).send({msg: "User Registered Successfully"}))
                    .catch(error => res.status(500).send({ error}))

                })
                .catch(error => {
                    return res.status(500).send({
                        error: "Unable to encrypt password"
                    })
                })
            }
        })
        .catch(error => {
            return res.status(500).send({error});
        })

    }catch(error){
        return res.status(500).send(error);
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
            return res.status(404).send({erorr: "User not found"});
        })
   }catch(error){
    return res.status(500).send(erorr);
   }
}

export async function getUser(req,res){
    
    const {username} = req.params;

    try{

        if(!username) return res.status(501).send({error: "Invalid username"});

        UserModel.findOne({username}, function(err, user){
            if(err) return res.status(500).send({err});
            if(!user) return res.status(501).send({err: "Couldn't find user"})

            //remove password from getUser
            const {password, ...rest} = Object.assign({},user.toJSON());

            return res.status(201).send(rest);
        })

    }catch(error){
        return res.status(404).send({erorr: "Cannot find user data"});
    }
}

export async function updateUser(req,res){
    try{

        const id = req.query.id;
        if(id){

            const body = req.body;
            //update date
            UserModel.updateOne({_id:id}, body, function(err, data){
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
    res.json('generateOTP route');
}

export async function verifyOTP(req,res){
    res.json('verifyOTP route');
}

export async function createResetSession(req,res){
    res.json('createResetSession route');
}

export async function resetPassword(req,res){
    res.json('resetPassword route');
}
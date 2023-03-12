import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';

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

        Promise.all([existUsername, existEmail]).then(()=>{
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

                }).catch(error => {
                    return res.status(500).send({
                        error: "Unable to encrypt password"
                    })
                })
            }
        }).catch(error => {
            return res.status(500).send("Somthing failed: " + error);
        })

    }catch(error){
        return res.status(500).send("This might failed " + error);
    }
}

export async function login(req,res){
    res.json('login route');
}

export async function getUser(req,res){
    res.json('getUser route');
}

export async function updateUser(req,res){
    res.json('updateUser route');
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
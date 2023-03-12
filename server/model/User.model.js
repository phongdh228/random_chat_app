import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username :{
        type: String,
        required: [true, "Please enter a username"],
        unique: [true, "Username already exists"]
    },
    password :{
        type: String,
        required: [true, "Please enter a password"],
        unique: false
    },
    email :{
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true
    },
    firstName :{type: String},
    lastName :{type: String},
    phone :{type: Number},
    address1 :{type: String},
    profile1 :{type: String}
});

export default mongoose.model.Users|| mongoose.model('User', UserSchema);
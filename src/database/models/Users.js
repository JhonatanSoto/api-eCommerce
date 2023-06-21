import mongoose, { Schema, model } from "mongoose";
import bcryptjs from  'bcryptjs'
const userSchema = new Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    file:{
        type: String
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Roles'
    }
},{
    timestamps: true
});

export default model('Users', userSchema);
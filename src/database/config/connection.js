import mongoose from "mongoose";
import dotenv  from 'dotenv';
dotenv.config();

console.log(process.env.HOST_DATABASE);

const db = mongoose.connection
export const mongoConnection = async ()=>{
    try {
        await mongoose.connect(process.env.HOST_DATABASE);
    } catch (error) {
        console.log((error));        
    }
};
db.once('open',_=>{console.log(process.env.HOST_DATABASE);})
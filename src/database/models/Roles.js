import {Schema, model} from "mongoose";

const rolesSchema = new Schema ({
    name:{
        type:String
    },
    description:{
        type:String
    }
});

export default model('Roles',rolesSchema);
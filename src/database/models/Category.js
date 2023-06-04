import {Schema, model} from "mongoose";
const CategoriesSchema = new Schema({
    name:{
        type:String

    },
    description:{
        type:String
    }
})

export default model('Category',CategoriesSchema);
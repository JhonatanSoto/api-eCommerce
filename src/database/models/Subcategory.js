import {Schema, model} from 'mongoose';

const SubcategoriesSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    }
});

export default model('Subcategory', SubcategoriesSchema);
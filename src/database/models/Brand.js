import {Schema,model} from 'mongoose';

const BrandsSchema = new Schema ({
    name:{
        type:String
    },
    description:{
        type:String
    },
    file:{
        type:String
    }
});
export default  model('Brand', BrandsSchema,'brands');

import mongoose, {Schema,model} from 'mongoose';

const FilesSchema = new Schema({
    name:{
        type: String
    },
    type:{
        type: String
    },
    size:{
        type: Number
    },
    extencion:{
        type:String
    },
    path:{
        type:String
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }}
    )

export default  model('File', FilesSchema,'files');

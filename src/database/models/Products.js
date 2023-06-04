import mongoose, { Schema, model} from "mongoose";
import Files from "./File.js";
const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Category",
      required: true
    },
    subcategory:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Subcategory"
    },
    description: {
      type: String
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Brand'
    },
    comments: {
      default: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
      }],
    },
    files:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'File'
      }],
    active:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
  ,
);


productsSchema.pre('findOneAndDelete', async function (next) {
  try {
    
    const product = await this.model.findOne(this.getQuery());    
    if (product) {
      const files = product.files;
      await Files.deleteMany({ _id: { $in: files } });
      console.log('Archivos eliminados');
    }
    console.log('Archivos no eliminados');
    
    next();
  } catch (error) {
    console.log(error);
  }
});

export default  model("Products", productsSchema);

import {models,model, Schema,Document,Types} from "mongoose";


export interface ImageInterface extends Document{
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: URL;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: URL;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author:{
    _id:String;
    firstName:String;
    lastName: String;
  }
  createdAt: Date;
  updatedAt: Date;
}


const ImageSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    transformationType: {
        type:String,
        required:true
    },
    publicId:{
        type:String,
        required:true
    },
    secureUrl:{
        type:URL,
        required:true
    },
    width:{
        type:Number
    },
    height:{
        type:Number
    },
    config:{
        type:Object
    },
    transformationUrl:{
        type:URL
    },
    aspectRatio:{
        type:String
    },
    color:{
        type:String
    },
    prompt:{
        type:String
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

const Image = models?.Image || model('Image',ImageSchema);

export default Image;
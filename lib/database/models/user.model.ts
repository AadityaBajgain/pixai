//clerkID, email, userName, photo, firstName, lastName, planId, creditBalance

import { model,models, Schema,Document } from "mongoose";

const UserSchema = new Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        require:true,
        unique:true
    },
    photo:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        require:true
    },
    planId:{
        type:String,
        default:1,
    },
    creditBalance:{
        type:Number,
        default:10
    }
});

const User = models?.User || model("User",UserSchema);

export default User;
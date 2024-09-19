import mongoose from "mongoose";
// define the person schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true, // name is required 
        unique:true
    },
    age:{
        type:Number,
        required:true

    },
    favoriteFood:{
        type:[String],  // array for favouriteFoods
        required:true
    }
})

const User = mongoose.model('User', userSchema)

export default User 
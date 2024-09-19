import mongoose from "mongoose"
const connectDB = async()=>{
try{
    await mongoose.connect(process.env.MONGO_URI,{
        dbName:"mongoose"

    })
    console.log('connected to mongoDB');
}catch(error){
    console.log('error connecting to mongoDB',error)
}
}
export default connectDB;
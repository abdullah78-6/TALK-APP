import mongoose, { mongo } from "mongoose";
export const connectdb=async()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("Data base is successfully connected");
        });
        await mongoose.connect(process.env.MONGODB_URI);
        
    } catch (error) {
        console.log("data base connection error",error);
        
    }
}

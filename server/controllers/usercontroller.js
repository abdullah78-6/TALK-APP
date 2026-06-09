import cloudinary from "../lib/clodinary.js";
import { generatetoken } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs"
export const Signup=async(req,res)=>{
    const{fullname,email,password,bio}=req.body;
    try {
        if(!fullname||!email||!password||!bio){
            return res.json({success:false,message:"Missing Details"});
        }
        const user=await User.findOne({email});
        if(user){
            return res.json({success:false,message:"Account already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newuser=await User.create({
            name:fullname,email,password:hashedpassword,bio
        });
        const token=generatetoken(newuser._id);
        res.json({success:true,userData:newuser,token,message:"Account created sucessfully"});

    } catch (error) {
        console.log(error.message);
         res.json({success:false,message:error.message});
        
    }

}
export const login=async(req,res)=>{
     try {
    const{email,password}=req.body;
    const userdata=await User.findOne({email});
    const ispasswordcorrect=await bcrypt.compare(password,userdata.password);
    if(!ispasswordcorrect){
        return res.json({success:false,message:"Invalid Credentials"})
    }
    const token=generatetoken(userdata._id);
    res.json({success:true,userdata,token,message:"Login successfull"});
   
        
    } catch (error) {
        console.log(error.message);
         res.json({success:false,message:error.message});
    }

}
export const checkauth=(req,res)=>{
    res.json({success:true,user:req.user});
}
export const updateProfile=async(req,res)=>{
    try {
        const{profilepic,bio,fulname}=req.body;
        const userid=req.user._id
        let updateduser;
        if(!profilepic){
        updateduser= await User.findByIdAndUpdate(userid,{bio,fullname},{new:true})
        }else{
            const upload=await cloudinary.uploader.upload(profilepic);
            updateduser=await User.findByIdAndUpdate(userid,{profilepic:upload.secure_url,bio,fullname},{new:true});
        }
        res.json({success:true,user:updateduser});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,user:error.message});
        
    }
}
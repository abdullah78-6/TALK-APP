import Message from "../models/message.js";
import User from "../models/user.js";
import cloudinary from "../lib/clodinary.js";
import { io, usersocketmap } from "../server.js";
export const getUserforSidebar=async(req,res)=>{
    try {
        const userid=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:userid}}).select("-password");
        const unseenmessages={}
        const promises=filteredUsers.map(async(user)=>{
            const message=await Message.find({senderid:user._id,receiverid:userid,seen:false})
            if(messages.length>0){
                unseenmessages[user._id]=messages.length;
            }

        })
        await Promise.all(promises);
        res.json({success:true,users:filteredUsers,unseenmessages});        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
        
    }
}
export const getMessages=async(req,res)=>{
    try {
        const{id:selecteduserid}=req.params;
        const myid=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderid:myid,receiverid:selecteduserid},
                {senderid:selecteduserid,receiverid:myid},
            ]
            
        })
        await Message.updateMany({senderid:selecteduserid,receiverid:myid},{seen:true})
        res.json({success:true,messages});
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
        
    }
}
export const markMessageasSeen=async(req,res)=>{
    try {
        const {id}=req.params;
        await Message.findByIdAndUpdate(id,{seen:true})
        res.json({success:true});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
        
    }
}
// send message to selected user
export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const receiverid=req.params.id;
        const senderid=req.user._id;
        let imageurl;
        if(image){
            const uploadresponse=await cloudinary.uploader.upload(image);
            imageurl=uploadresponse.secure_url;

        }
        const newmessage=await Message.create({
            senderid,
            receiverid,
            text,
            image:imageurl
        })
        //emit new message reciever socket
        const recieversocketid=usersocketmap[receiverid];
        if(recieversocketid){
            io.to(recieversocketid).emit("newmessage",newmessage);
        }
        res.json({success:true,newmessage});
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
        
    }
}
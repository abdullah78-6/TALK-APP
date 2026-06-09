import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectdb } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageroutes.js";
import { Server } from "socket.io";
// import { emit } from "cluster";
// Create express app and http server
const app=express();
const server=http.createServer(app);
export const io=new Server(server,{
    cors:{origin:"*"}
})
export const usersocketmap={};
// socket connection
io.on("connection",(socket)=>{
    const userid=socket.handshake.query.userId;
    console.log("user connected",userId);
    if(userId) usersocketmap[userId]=socket.id;
    // emit online user to all connected client
    io.emit("getonlineusers",Object.keys(usersocketmap));
    socket.on("disconnect",()=>{
        console.log("user disconnected",userid);
        delete usersocketmap[userId];
        io.emit("getonlineusers",Object.keys(usersocketmap));
    })


})
app.use(express.json({limit:"4mb"}));
app.use(cors());
app.use("/api/status",(req,res)=>res.send("server is live"));
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter);
await connectdb();
const port=process.env.PORT||5000;
server.listen(port,()=>{
    console.log("server is running on port "+port);
});


import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { connectdb } from "./lib/db.js";
// Create express app and http server
const app=express();
const server=http.createServer(app);
app.use(express.json({limit:"4mb"}));
app.use(cors());
app.use("/api/status",(req,res)=>res.send("server is live"));
await connectdb();
const port=process.env.PORT||5000;
server.listen(port,()=>{
    console.log("server is running on port "+port);
});


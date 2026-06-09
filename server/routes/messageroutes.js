import express from "express";
import { getMessages, getUserforSidebar, markMessageasSeen, sendMessage } from "../controllers/messagecontroller.js";
import { protectroute } from "../middleware/auth.js";
const messageRouter=express.Router();
messageRouter.get("/users",protectroute,getUserforSidebar);
messageRouter.get("/:id",protectroute,getMessages);
messageRouter.put("mark/:id",protectroute,markMessageasSeen);
messageRouter.post("/send/:id",protectroute,sendMessage);
export default messageRouter;

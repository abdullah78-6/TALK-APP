import express from "express";
import { checkauth, login, Signup, updateProfile } from "../controllers/usercontroller.js";
import { protectroute } from "../middleware/auth.js";
const userRouter=express.Router();
userRouter.post("/signup",Signup);
userRouter.post("/login",login);
userRouter.put("/update-profile",protectroute,updateProfile);
userRouter.get("/check",protectroute,checkauth);
export default userRouter;
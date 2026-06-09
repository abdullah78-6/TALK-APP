import { createContext, useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast"
import {io} from "socket.io-client"
const backendUrl=import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL=backendUrl;

export const Authcntext=createContext();
export const Authprovider=({children})=>{
    const[token,settoken]=useState(localStorage.getItem("token"));
    const [authUser,setAuthUser]=useState(null);
    const [onlineUser,setonlineUser]=useState([]);
    const [socket,setsocket]=useState([]);
    // check if user is authenticated and if so,set the user data and connect the socket
    const checkAuth=async()=>{
        try {
        const {data}= await axios.get("/api/auth/check");

        if(data.success){
            setAuthUser(data.user);
            connectsocket(data.user);
        }
        } catch (error) {
            toast.error(error.message);
        
            
        }
    }
    const Login=async(state,credentials)=>{
        try {
            const{data}=await axios.post(`/api/auth/${state}`,credentials);
            if(data.success){
                setAuthUser(data.userdata);
                connectsocket(data.userdata);
                axios.defaults.headers.common["token"]=data.token;
                settoken(data.token);
                localStorage.setItem("token",data.token);
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            
        }

    }
    const Logout=async()=>{
        localStorage.removeItem("token");
        settoken(null);
        setAuthUser(null);
        setonlineUser([]);
        axios.defaults.headers.common["token"]=null;
        toast.success("Logged out Sucessfully");
        socket.disconnect();


    }
    const updateProfle=async(body)=>{
        try {
            const {data}=await axios.put("/api/auth/update-profile",body);
            if(data.success){
                setAuthUser(data.user);
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            toast.error(error.message);
            
        }

    }
    const connectsocket=(userdata)=>{
        if(!userdata||socket?.connected) return;
        const newsocket=io(backendUrl,{
            query:{
                userId:userdata._id,
            }
        });
        newsocket.connect();
        setsocket(newsocket);
        newsocket.on("getonlineusers",(userid)=>{
            setonlineUser(userid);

        })

    }
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"]=token;
        }
        checkAuth();
    },[])
    const value={
        axios,
        authUser,
        onlineUser,
        socket,
        Login,
        Logout,
        updateProfle

    }
    return (
        <Authcntext.Provider value={value}>
            {children}

        </Authcntext.Provider>
    )
}
import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { Authcntext } from '../../context/authcontext';
const Loginpage = () => {
  const[currstate,setcurrstate]=useState("Sign up");
  const[fullname,setfullname]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const[bio,setbio]=useState("");
  const[isDatasubmitted,setisDatasubmitted]=useState(false);
  const {Login}=useContext(Authcntext);
  const onSubmithandler=(e)=>{
    e.preventDefault();
    if(currstate==="Sign up" &&!isDatasubmitted){
      setisDatasubmitted(true);
      return;
    }
    Login(currstate==="Sign up"?'signup':'login',{fullname,email,password,bio})

  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />
      {/* right */}
    <form onSubmit={onSubmithandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg '>
    <h2 className='font-medium text-2xl flex justify-between items-center'>
      {currstate}
      {isDatasubmitted &&<img onClick={()=>setisDatasubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
    </h2>
    {currstate==="Sign up"&&!isDatasubmitted&&(
      <input onChange={(e)=>setfullname(e.target.value)} value={fullname} type="text" placeholder='Full Name'
      className='p-2 border border-gray-500 rounded-md focus:outline-none'
    required/>
    )}
    {!isDatasubmitted && (
      <>
      <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
       <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
     
      </>
    )}
    {currstate==="Sign up"&&isDatasubmitted&&(
        <textarea onChange={(e)=>setbio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indiago-500' placeholder='Provide a short bio...'></textarea>
      )
    }
    <button type="submit" className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer '>
      {currstate==="Sign up"?"Create Account":"Login Now"}
    </button>
    <div className='flex items-center gap-2 text-sm text-gray-500 '>
      <input type="checkbox" />
      <p>Agree to the terms of use & privacy policy</p>
    </div>
    <div className='flex flex-col gap-2'>
      {currstate==="Sign up"?(
        <p className='text-sm text-gray-600'>Already have an account?<span onClick={()=>{setcurrstate("Login");setisDatasubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
      ):(
        <p className='text-sm text-gray-600'>Create an account<span onClick={()=>{setcurrstate("Sign up")}} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
      )}

    </div>
    

    </form>
      
    </div>
  )
}

export default Loginpage

import React, { useState } from 'react'
import assets from '../assets/assets'
import {useNavigate} from "react-router-dom"
const Profilepage = () => {
  const[selectedimage,setselectedimg]=useState(null);
  const navigate=useNavigate();
  const [name,setname]=useState("Martin Johnson");
  const[bio,setbio]=useState("Hi Everyone I am Using A Talk-App")
  const handleSubmit=async(e)=>{
    e.preventDefault();
    navigate('/');

  }
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center text-white'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gary-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1' >

          <h3 className='text-lg'>Profile details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=>setselectedimg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={selectedimage?URL.createObjectURL(selectedimage):assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedimage&&'rounded-full'}`} />            
            upload profile image

          </label>
          <input onChange={(e)=>setname(e.target.value)} value={name} type="text" required placeholder='Your Name' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' />
          <textarea required placeholder='Write Profile Bio' rows={4} onChange={(e)=>setbio(e.target.value)} value={bio} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 ' ></textarea>
          <button type="submit" className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>Save</button>

        </form>
        <img className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ' src={assets.logo_icon} alt="" />

      </div>

      
    </div>
  )
}

export default Profilepage

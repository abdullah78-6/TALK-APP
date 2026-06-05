import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils';

const Chatcontainer = ({setselectedUser,selectedUser}) => {
  const scrollEnd=useRef();
  useEffect(()=>{
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView({behavior:"smooth"});
    }

  },[]);
  return selectedUser? (
  <div className='h-full overflow-y-scroll relative backdrop-blur-lg'>
    {/* header */}
    <div className='flex items-center justify-between py-3 px-4 border-b border-stone-500'>
      
      <div className='flex items-center gap-3'>
        <img src={assets.profile_martin} alt="" className='w-10 rounded-full' />
        
        <p className='flex items-center gap-2 text-white font-medium'>
          Martin Johnson
          <span className='w-2 h-2 rounded-full bg-green-500 inline-block'></span>
        </p>
      </div>

      <div className='flex items-center gap-4'>
        <img onClick={()=>setselectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden w-7 cursor-pointer' />
        <img src={assets.help_icon} alt="" className='hidden md:block w-5 cursor-pointer' />
      </div>

    </div>

    {/* chat area */}
    <div className='flex flex-col h-[calc(100%-120px)] overflow-y-auto p-4 pb-24 gap-2'>
      {messagesDummyData.map((msg,index)=>(
        <div 
          key={index} 
          className={`flex items-end gap-2 ${msg.senderId!=='680f50e4f10f3cd28382ecf9' ? 'flex-row-reverse' : 'justify-end'}`}
        >

          {msg.image?(
            <img 
              src={msg.image} 
              alt="" 
              className='max-w-[230px] rounded-xl border border-gray-700 overflow-hidden mb-6'
            />
          ):(
            <p className={`p-3 max-w-[240px] text-sm font-light rounded-xl mb-6 break-words bg-violet-500/30 text-white
            ${msg.senderId==='680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
              {msg.text}
            </p>
          )}

          <div className='text-center text-xs'>
            <img 
              src={msg.senderId==='680f50e4f10f3cd28382ecf9'
              ?assets.avatar_icon
              :assets.profile_martin} 
              alt="" 
              className='w-8 rounded-full'
            />
            <p className='text-gray-400 mt-1'>
              {formatMessageTime(msg.createdAt)}
            </p>
          </div>

        </div>
      ))}
      <div ref={scrollEnd}></div>
    </div>

    {/* bottom area */}
    <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-4 backdrop-blur-md bg-black/20'>
      
      <div className='flex-1 flex items-center bg-gray-100/10 px-4 rounded-full'>
        <input 
          type="text" 
          placeholder='Send a message' 
          className='flex-1 bg-transparent text-sm py-3 outline-none text-white placeholder-gray-400'
        />

        <input type="file" id="image" accept='image/png, image/jpeg' hidden />

        <label htmlFor="image">
          <img 
            src={assets.gallery_icon} 
            alt="" 
            className='w-5 mr-1 cursor-pointer hover:scale-105 transition'
          />
        </label>

      </div>

      <img 
        src={assets.send_button} 
        alt="" 
        className='w-10 cursor-pointer hover:scale-105 transition'
      />

    </div>
  </div>
):(
  <div className='flex flex-col items-center justify-center gap-3 text-gray-500 bg-white/10 h-full max-md:hidden'>
    <img src={assets.logo_icon} className='w-16' alt="" />
    <p className='text-lg font-medium text-white'>
      Chat anytime, anywhere
    </p>
  </div>
)
}

export default Chatcontainer

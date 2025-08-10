import { assets } from '@/assets/assets'
import Footer from '@/compon/Footer'
import Sidebar from '@/compon/Sidebar'
import { useClerk, useUser } from '@clerk/clerk-react'
import { Menu, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Layoutt = () => {
  const nav=useNavigate();
  const [sidebar, setSidebar] = useState(false)
  const{user}=useUser();
  const{openSignIn}=useClerk()

  return (
    <div className='flex flex-col items-start justify-start h-screen'>
     <nav className='w-full  flex items-center justify-between px-8 border-b border-gray-200'>
      <img className='h-15 w-16' src={assets.logo} alt="" onClick={() => nav('/')} />
      {
sidebar ?<X onClick={()=>{setSidebar(false)}} className='w-6 h-6 text-gray-600 sm:hidden '></X>:<Menu onClick={()=>{setSidebar(true)}} className='w-6 h-6 text-gray-600 sm:hidden '></Menu>
      }
     </nav>
     <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <div className='flex-1 w-full bg-[#F4F7FB]'><Outlet className="w-full h-screen" /></div>
     </div>

 
    </div>
  )
}

export default Layoutt
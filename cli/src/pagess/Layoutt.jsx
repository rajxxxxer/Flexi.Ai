import { assets } from '@/assets/assets';
import Footer from '@/compon/Footer';
import Sidebar from '@/compon/Sidebar';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSidebar } from '@/context/SidebarContext';

const Layoutt = () => {
  const nav = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  // ✅ Accessing context state
  const { sidebar, setSidebar } = useSidebar();

  return (
    <div className='flex flex-col items-start justify-start h-screen'>
      {/* Top Navbar */}
      <nav className='w-full h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white shadow-sm'>
        <img
          className='h-10 w-10 cursor-pointer'
          src={assets.logo}
          alt='Logo'
          onClick={() => nav('/')}
        />
        <div className='sm:hidden'>
          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className='w-6 h-6 text-gray-600'
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className='w-6 h-6 text-gray-600'
            />
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className='flex-1 w-full flex h-[calc(100vh-64px)] overflow-hidden'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        
        {/* ✅ Responsive main area with padding for when sidebar is closed */}
        <div
          className={`
            flex-1 transition-all duration-300 bg-[#F4F7FB] overflow-y-auto
            ${sidebar ? 'max-sm:blur-sm pointer-events-none' : ''}
          `}
        >
          <Outlet />
        </div>
      </div>

      {/* Optional Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layoutt;

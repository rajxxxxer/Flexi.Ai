import { AiToolsData } from '@/assets/assets'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const AiTools = () => {
  const user = useUser();
  const nav = useNavigate();

  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24'>
      <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI Tools</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>
          Everything you need to create stunning content with AI. Optimize your workflow and unleash your creativity.
        </p>
      </div>

      {/* 💡 Wrap .map() inside this flex container */}
      <div className='flex flex-wrap mt-10 justify-center gap-6'>
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className='p-6 w-full sm:w-[45%] md:w-[30%] max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
            onClick={() => user.isSignedIn && nav(tool.path)}
          >
            <div className='bg-white rounded-lg shadow-md p-6 h-full'>
              <tool.Icon
                className='h-12 w-12 mb-4 text-blue-600'
                style={{
                  background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                }}
              />
              <h3 className='text-lg font-semibold mb-2'>{tool.title}</h3>
              <p className='text-gray-600'>{tool.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;

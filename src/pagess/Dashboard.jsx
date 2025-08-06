import React, { useState, useEffect } from 'react';
import { Gem, Sparkles } from 'lucide-react';
import { dummyCreationData } from '@/assets/assets'; // or '@/lib/dummyData' based on your project
import { Protect, useUser } from '@clerk/clerk-react';
import CreationItem from '@/compon/CreationItem';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useUser();
  const nav=useNavigate();
 
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    
    getDashboardData();
  }, []);

  return (
    <div className='h-full overflow-y-auto p-6 bg-gray-50'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Dashboard Overview</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {/* Total Creations Card 1 */}
        <div className='bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300'>
          <div>
            <p className='text-sm text-gray-500'>Active Plan</p>
            <h2 className='text-3xl font-bold text-gray-800'><Protect plan='premium' fallback='free'>Premium</Protect> Plan</h2>
          </div>
          <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center'>
           <Gem className='w-5 text-white'></Gem>
          </div>
        </div>

        {/* Total Creations Card 2 (duplicate) */}
        <div className='bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300'>
          <div>
            <p className='text-sm text-gray-500'>Total Creations</p>
            <h2 className='text-3xl font-bold text-gray-800'>{creations.length}</h2>
          </div>
          <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center'>
            <Sparkles className='w-6 h-6' />
          </div>
        </div>
       
      </div>
       <div className='space-y-3'>
          <p className='mt-6 mb-6'>
            {
              creations.map((item)=><CreationItem item={item} key={item.id}></CreationItem>)
            }
          </p>
        </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Gem, Sparkles } from 'lucide-react';
import { dummyCreationData } from '@/assets/assets';
import { Protect, useUser } from '@clerk/clerk-react';
import CreationItem from '@/compon/CreationItem';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '@/context/SidebarContext'; // ✅ Context import

export const Dashboard = () => {
  const { user } = useUser();
  const nav = useNavigate();
  const { sidebar } = useSidebar(); // ✅ Get sidebar state

  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    if (!user) {
      nav('/sign-in');
      return;
    }
    getDashboardData();
  }, []);

  return (
    <div
      className={`
        h-full overflow-y-auto p-4 sm:p-6 bg-gray-50 transition-all duration-300
        ${!sidebar ? 'max-sm:pl-16' : 'max-sm:pl-0'}
      `}
    >
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Active Plan Card */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-gray-500">Active Plan</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              <Protect plan="premium" fallback="free">Premium</Protect> Plan
            </h2>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center flex-shrink-0">
            <Gem className="w-5 sm:w-6 text-white" />
          </div>
        </div>

        {/* Total Creations Card */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Total Creations</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center">
            <Sparkles className="w-5 sm:w-6" />
          </div>
        </div>
      </div>

      {/* Creation List */}
      <div className="space-y-3 mt-6">
        <div className="flex flex-col gap-3">
          {creations.map((item) => (
            <CreationItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

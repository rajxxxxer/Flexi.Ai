import React, { useState, useEffect } from 'react';
import { Gem, Sparkles } from 'lucide-react';
import { Protect, useAuth, useUser } from '@clerk/clerk-react';
import CreationItem from '@/compon/CreationItem';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '@/context/SidebarContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const Dashboard = () => {
  const { user } = useUser();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const { sidebar } = useSidebar();
  const { getToken } = useAuth();
  const [creations, setCreations] = useState([]);

  // ✅ function to fetch data
  const getDashboardData = async () => {
    try {
     

      // pehle cache check karo
      const cache = sessionStorage.getItem("creations");
      if (cache) {
        setCreations(JSON.parse(cache));
        setLoading(false);
        return;
      }
       setLoading(true);

      const { data } = await axios.get('api/user/user-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.content);
        // ✅ cache me store karo
        sessionStorage.setItem("creations", JSON.stringify(data.content));
      } else {
        toast.error(data.message || 'Failed to fetch creations');
      }
    } catch (error) {
      console.error("Fetch error", error);
      toast.error('Something went wrong while fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // ✅ useEffect
  useEffect(() => {
    if (!user) {
      nav('/sign-in');
      return;
    }
    getDashboardData();
  }, [user]);

  return (
    <div
      className={`
        relative h-full overflow-y-auto p-4 sm:p-6 bg-gray-50 transition-all duration-300
        ${!sidebar ? 'max-sm:pl-16' : 'max-sm:pl-0'}
      `}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Active Plan */}
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

        {/* Total Creations */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Total Creations</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {creations.length}
            </h2>
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

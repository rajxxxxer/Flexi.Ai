import { useAuth, useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/published-creation', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message || 'Failed to load creations');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load creations');
      console.error('Fetch creations error:', error);
    } finally {
      setLoading(false);
    }
  };

  const imagelike = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/user/toggle-like',
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to toggle like');
      console.error('Toggle like error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-6 p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Creations</h1>

      {/* Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <svg
            className="animate-spin h-10 w-10 text-[#FF4938]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}

      {/* No creations */}
      {!loading && creations.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-20">
          No creations found.
        </p>
      )}

      {/* Grid of creations */}
      {!loading && creations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={creation.content}
                  alt="AI creation"
                  className="w-full h-[400px] sm:h-[450px] object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-white text-xs sm:text-sm font-medium break-words flex-1">
                    {creation.prompt}
                  </p>

                  <div
                    onClick={() => imagelike(creation.id)}
                    className="flex items-center gap-1 bg-white/80 dark:bg-gray-900/80 px-2 py-1 rounded-full backdrop-blur-sm shrink-0 cursor-pointer select-none"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        creation.likes.includes(user?.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-500 group-hover:text-red-400'
                      }`}
                    />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {creation.likes.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;

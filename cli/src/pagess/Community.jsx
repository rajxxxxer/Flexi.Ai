import { dummyPublishedCreationData } from '@/assets/assets';
import { useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = () => {
    if (!user) return;
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    fetchCreations();
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-6 p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Creations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
          >
            {/* Image with prompt & likes overlay */}
            <div className="relative overflow-hidden">
              <img
                src={creation.content}
                alt="AI creation"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-wrap items-center justify-between gap-2">
                {/* Prompt */}
                <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words flex-1">
                  {creation.prompt}
                </p>

                {/* Likes */}
                <div className="flex items-center gap-1 bg-white/80 dark:bg-gray-900/80 px-2 py-1 rounded-full backdrop-blur-sm shrink-0">
                  <Heart
                    className={`w-5 h-5 cursor-pointer transition-colors ${
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
    </div>
  );
};

export default Community;

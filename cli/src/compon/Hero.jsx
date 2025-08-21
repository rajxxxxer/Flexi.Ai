import { assets } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { useClerk, useUser } from '@clerk/clerk-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navi = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const handlestart = () => {
    if (!user) {
      openSignIn(); // Sign in modal open
      return;       // Sign-in hone ke baad navigate hoga
    }
    navi('/ai');
  };
  const handledemo=()=>{
    if(!user){
      openSignIn();
      return;

    }
    navi('ai/w-a')
  }

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.2]">
          Create amazing content with <br />
          <span className="text-blue-600">AI</span>
        </h1>
        <p className="mt-2 text-gray-700">
          Unleash your creativity with our powerful AI tools.
        </p>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto max-sm:text-xs text-gray-600">
          Transform your ideas into stunning visuals and text effortlessly. Write articles, generate images, & more.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm max-sm:text-xs mt-8 w-full sm:w-auto px-4">
        <Button
          onClick={handlestart}
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 px-6 py-2 rounded-lg shadow-md w-full sm:w-auto"
        >
          Start Creating Now
        </Button>

        <Button
        onClick={handledemo}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300 px-6 py-2 rounded-lg w-full sm:w-auto"
        >
          Watch Demo
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8 mx-auto text-gray-600">
        <img className="h-8" src={assets.user_group} alt="User Group" />
        Trusted by over 1000+ users
      </div>
    </div>
  );
};

export default Hero;

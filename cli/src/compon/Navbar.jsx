import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import ShinyButton from "./ShinyButton";

const Navbar = () => {
  const nav = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();


  return (
    <div className="fixed top-0 left-0 w-full h-16 z-50 backdrop-blur-md bg-white/30 shadow-md px-6 flex items-center justify-between">
      {/* Logo (Left) */}
      
      <img
        src={assets.logo}
        alt="Logo"
        className="h-12 w-30 max-w-[160px] cursor-pointer object-contain"
        onClick={() => nav("/")}
      />

      {/* Get Started Button (Right) */}
      {user?<UserButton></UserButton>: 
      <ShinyButton val="Get Started" onclick={openSignIn}></ShinyButton>
      }

    </div>
  );
};

export default Navbar;

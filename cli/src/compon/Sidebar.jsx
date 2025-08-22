import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users
} from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
 const handleLogout = async () => {
    // clear all creations cache on logout
    sessionStorage.clear();
    await signOut();
    nav("/sign-in");
  };
  const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/w-a', label: 'Article-Generator', Icon: SquarePen },
    { to: '/ai/bt', label: 'Blog Title', Icon: Hash },
    { to: '/ai/gen', label: 'Generate Image', Icon: Image },
    { to: '/ai/rev', label: 'Review', Icon: FileText },
    { to: '/ai/com', label: 'Community', Icon: Users },
    { to: '/ai/ro', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/remback', label: 'Remove Background', Icon: Eraser }
  ];

  if (!user) return null;

  return (
    <div
      className={`w-64 bg-gray-100 shadow-lg border-r border-gray-200 flex flex-col justify-between max-sm:absolute top-14 bottom-0 z-50 ${
        sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
      } transition-all duration-300 ease-in-out`}
      style={{ height: 'calc(100vh - 3.5rem)' }}
    >
      {/* Top Section - scrollable only on hover */}
      <div
        className="flex flex-col px-4 pt-8 overflow-hidden hover:overflow-auto"
        style={{ flexGrow: 1 }}
      >
        <div className="flex flex-col items-center">
          <img
            src={user.imageUrl}
            alt={user.fullName || 'User Avatar'}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
          />
          <h1 className="text-center text-lg font-bold mt-3 text-gray-800">
            {user.fullName || 'User'}
          </h1>
        </div>

        <div className="mt-6 space-y-1 text-sm text-gray-600 font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `group px-4 py-2.5 flex items-center gap-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                      isActive ? 'text-white' : ''
                    }`}
                  />
                  <span className="truncate">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full border-t border-gray-200 px-7 py-3 flex items-center justify-between bg-white">
        <div
          onClick={openUserProfile}
          className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 rounded-md transition"
        >
          <img
            src={user.imageUrl}
            alt={user.fullName || 'User Avatar'}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h1 className="text-sm font-semibold text-gray-800">
              {user.fullName || 'User'}
            </h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="free">Premium</Protect> Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={handleLogout}
          className="w-5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;

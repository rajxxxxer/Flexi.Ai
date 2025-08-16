// components/ShinyButton.jsx
import React from 'react';

const ShinyButton = ({dis, val, onclick, cl}) => {
  return (
    <div className={`button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100 ${cl? cl : ''}`}>
      <button disabled={dis} onClick={onclick} className={`px-8 text-sm py-2.5 text-white rounded-full font-medium ${cl ? cl : 'bg-gray-800'}`}>

        {
          dis ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin">Loading</span>
          ) : (
            val
          )
        }

      </button>
    </div>
)};

export default ShinyButton;

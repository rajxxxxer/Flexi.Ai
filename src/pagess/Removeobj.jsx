import React from 'react'
import {  Eraser, Hash, Sparkles } from 'lucide-react';
import { useState } from 'react';
const Removeobj = () => {
  const [input, setInput] = useState('');
  const [object, setObject] = useState('');
  
  // Dummy blog category list (replace with real API or props)
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Input:', input);
    console.log('Blog:', selectedblog);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50">
      {/* Left: Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#FF4938]" />
            <h2 className="sticker text-lg font-semibold text-gray-800">Object Removal</h2>
          </div>
    <p className="text-sm text-gray-500 mt-1 font-light">Upload Image</p>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setInput(e.target.files[0])}
            className="border outline-none rounded-md border-gray-300 p-3 w-full text-sm"
            
            required
          />


        </div>
        
      <div className="w-full sm:w-auto mt-4 flex items-center gap-3 justify-center sm:justify-start">
  <Eraser className="w-7 h-7 text-[#FF4938]" />
  <ShinyButton
    val="Remove Background"
    cl="bg-gradient-to-r from-[#F6AB1] to-[#FF4938]"
    onclick={handleSubmit}
  />
</div>

      </form>

      {/* Right: Output */}
      <div className="w-full md:w-1/2 p-6 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <div className="mb-4 flex items-center gap-2">
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-lg font-semibold text-gray-800">VividCraft</h1>
        </div>

        <div className="flex-1 flex justify-center items-center text-sm text-gray-700">
          <div className="flex flex-col items-center text-center gap-4 max-w-md px-4">
            <Eraser className="w-6 h-6 text-[#FF4938]" />
            <p>
            "Drop your image here. We’ll handle the background… and make it disappear." 🪄
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Removeobj
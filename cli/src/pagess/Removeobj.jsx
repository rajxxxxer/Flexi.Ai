import React from 'react'
import {   Scissors, Sparkles } from 'lucide-react';
import { useState } from 'react';
import ShinyButton from '@/compon/ShinyButton';
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
          <p className='mt-6 text-sm font-medium'>describe object name to remove.</p>
             <textarea
              rows={4}
              value={object}
              onChange={(e) => setObject(e.target.value)}
              className="border mt-1 outline-none rounded-md border-gray-300 p-2 w-full text-xs"
              placeholder="watch or spoon,only one object at a time"
              required
            />


        </div>
        
      <div className="w-full sm:w-auto mt-4 flex items-center gap-3 justify-center sm:justify-start">
        <Scissors className="w-5 h-6 text-[#8E37E]" />
        <ShinyButton
          val="Remove Object"
          cl="bg-gradient-to-r from-[#417DF6] to-[#8E37EB]"
          onclick={handleSubmit}
        />
</div>

      </form>

      {/* Right: Output */}
      <div className="w-full md:w-1/2 p-6 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <div className="mb-4 flex items-center gap-2">
          <Scissors className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-lg font-semibold text-gray-800">ProcesSeD Image..here</h1>
        </div>

        <div className="flex-1 flex justify-center items-center text-sm text-gray-700">
          <div className="flex flex-col items-center text-center gap-4 max-w-md px-4">
            <Scissors className="w-6 h-6 text-[#FF4938]" />
            <p>
            "Upload image here. We’ll handle the ObjEcT… and make it disappear." 🪄
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Removeobj
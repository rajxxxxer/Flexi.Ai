
import ShinyButton from '@/compon/ShinyButton';
import {Eraser, FileText,  Sparkles } from 'lucide-react';
import React, { useState } from 'react';

const Review = () => {
  const [input, setInput] = useState('');
    
    
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
            <h2 className="sticker text-lg font-semibold text-gray-800">ResumeCraft</h2>
          </div>
          <p className=' text-sm text-gray-500 mt-1 font-light'>Upload your resume</p>
          <input
            type='file'
            accept='application/pdf'
            onChange={(e) => setInput(e.target.files[0])}
            className="border outline-none rounded-md border-gray-300 p-3 w-full text-sm"
            
            required
          />


        </div>
        <p className="text-sm text-gray-500 mt-1 font-light">Upload and review resumes in PDF format</p>
      <div className="w-full sm:w-auto mt-4 flex items-center gap-3 justify-center sm:justify-start">
  <FileText className="w-7 h-7 text-[#00DA83]" />
  <ShinyButton
    val="REVIEW RESUME"
    cl="bg-gradient-to-r from-[#00DA83] to-[#009B77]"
    onclick={handleSubmit}
  />
</div>

      </form>

      {/* Right: Output */}
      <div className="w-full md:w-1/2 p-6 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-96 max-h-[600px]">
        <div className="mb-4 flex items-center gap-2">
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-lg font-semibold text-gray-800">AI-driven keyword and skill analysis</h1>
        </div>

        <div className="flex-1 flex justify-center items-center text-sm text-gray-700">
          <div className="flex flex-col items-center text-center gap-4 max-w-md px-4">
            <FileText className="w-6 h-6 text-[#FF4938]" />
            <p>
            "Drop your resume here. We’ll handle the analysis… and make it shine." 🪄
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
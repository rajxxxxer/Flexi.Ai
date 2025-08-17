
import ShinyButton from '@/compon/ShinyButton';
import { useAuth } from '@clerk/clerk-react';
import {Eraser, FileText,  Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
const Review = () => {
  const [input, setInput] = useState('');
    
     const [loading, setLoading] = useState(false);
      const [content, setContent] = useState('');
      const { getToken } = useAuth();
    // Dummy blog category list (replace with real API or props)
    
   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);

   

    const formData = new FormData();
    formData.append("resume", input); // field name backend ke multer.single("resume") se match hona chahiye

    const { data } = await axios.post("api/ai/resume", formData, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (data.success) {
      setContent(data.content);
    } else {
      toast.error(data.message || "Failed to review resume");
    }
  } catch (error) {
    console.error("Resume upload error:", error);
    toast.error(error.response?.data?.message || error.message);
  } finally {
    setLoading(false);
  }
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
  dis={loading}
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
        {!content ?   <div className="flex flex-col items-center text-center gap-4 max-w-md px-4">
            <FileText className="w-6 h-6 text-[#FF4938]" />
            <p>
            "Drop your resume here. We’ll handle the analysis… and make it shine." 🪄
            </p>
          </div> :<div className="mt-3 max-h-96 overflow-y-auto text-sm text-slate-600 p-2 border rounded-lg bg-gray-50">
  <Markdown>{content}</Markdown>
</div>
}
        </div>
      </div>
    </div>
  )
}

export default Review
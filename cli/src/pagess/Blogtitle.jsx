import ShinyButton from '@/compon/ShinyButton';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import {  Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const Blogtitle = () => {
  const blogs = ['General', 'Technology', 'Health', 'Lifestyle', 'Travel', 'Education', 'Food'];

  const [selectedblog, setSelectedblog] = useState(blogs[0]);
  const [input, setInput] = useState('');
const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
  try{
 setLoading(true);

    const prompt = `Generate a blog title about ${input} in ${selectedblog} category`;

    const { data } = await axios.post('api/ai/generate-blog', {
      prompt
      //location: "India" // ✅ Hardcoded here
    }, {
      headers: {
        Authorization: `Bearer ${await getToken()}`
      }
    });

    if (data.success) {
      setContent(data.content);
    } else {
      
      toast.error(data.message || 'Failed to generate article');
    }

    setLoading(false);
  }
  catch(err){
    console.error('Error generating blog title:', err);
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
          <div className='flex items-center gap-2 mb-4'>
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">AI Title Generator</h2>
          </div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border outline-none rounded-md border-gray-300 p-3 w-full text-sm"
            placeholder="Enter article topic..."
          />

          <div className="mt-4">
            <p className="font-medium text-sm mb-2 text-gray-700">Select Blog Category:</p>
            <div className="flex gap-2 flex-wrap">
              {blogs.map((option) => (
                <span
                  key={option}
                  onClick={() => setSelectedblog(option)}
                  className={`cursor-pointer text-sm px-4 py-2 rounded-full border transition 
                    ${selectedblog === option
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'}`}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>

   <div className="w-full sm:w-auto mt-4 flex justify-center sm:justify-start  ">
  <ShinyButton dis={loading} val="Generate-Title" cl="bg-gradient-to-r from-[#C341F6] to-[#8E37EB]" onclick={handleSubmit} />
</div>


      </form>

      {/* Right: Output */}
      <div className="w-full md:w-1/2 p-6 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <div className="mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-800">Generated Titles</h1>
        </div>

        <div className="flex-1 flex justify-center items-center text-sm text-gray-700">
        {!content ?  <div className='flex flex-col items-center text-center gap-4 max-w-md px-4'>
            <Hash className="w-6 h-6 text-blue-600" />
            <p>
              This is where the generated titles will appear. You can edit them, save them, or share them.
            </p>
          </div> : <p className='reset-tw'>
            <Markdown>{content}</Markdown>
          </p> }
        </div>
      </div>
    </div>
  );
};

export default Blogtitle;

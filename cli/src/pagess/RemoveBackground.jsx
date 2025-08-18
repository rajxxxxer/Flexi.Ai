import ShinyButton from '@/compon/ShinyButton';
import { Eraser, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState(null); // store file object, not string
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return toast.error('Please upload an image first.');

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', input);

      const { data } = await axios.post('api/ai/remove-bg', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || 'Failed to remove background');
      }
    } catch (error) {
      console.error('Error removing background:', error);
      toast.error('Error removing background');
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
            <h2 className="text-lg font-semibold text-gray-800">BackGone</h2>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setInput(e.target.files[0])}
            className="border outline-none rounded-md border-gray-300 p-3 w-full text-sm"
            required
          />

          <p className="text-sm text-gray-500 mt-1 font-light">
            Upload an image to remove its background. JPG, PNG... Just explore!
          </p>
        </div>

        <div className="w-full sm:w-auto mt-4 flex items-center gap-3 justify-center sm:justify-start">
          <Eraser className="w-7 h-7 text-[#FF4938]" />
          <ShinyButton
            dis={loading}
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
          {!content ? (
            <div className="flex flex-col items-center text-center gap-4 max-w-md px-4">
              <Eraser className="w-6 h-6 text-[#FF4938]" />
              <p>"Drop your image here. We’ll handle the background… and make it disappear." 🪄</p>
            </div>
          ) : (
            <img src={content} alt="Background removed" className="mt-3 max-w-full h-full object-contain rounded" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;

import { Image } from 'lucide-react';
import React, { useState } from 'react';
import ShinyButton from '@/compon/ShinyButton';
import { Hash, Sparkles } from 'lucide-react';

const GenrateIm = () => {
  const Imagestyle = [
    'Realistc',
    'Ghibli style',
    'Anime style',
    'Cartoon style',
    'Pixel art style',
    'Fantasy style',
    'Realistic Style',
    '3d style',
    'Cyberpunk style',
    'Sci-fi style',
    'Steampunk style',
    'Abstract style'
  ];

  const [selectedstyle, setSelectedstyle] = useState('Realistc');
  const [input, setInput] = useState('');
  const [published, setPublished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Input:', input);
    console.log('Style:', selectedstyle);
  };

  return (
    <div className="bg-gray-50 p-3 flex justify-center">
      <div className="flex flex-col md:flex-row gap-3 w-full max-w-3xl">

        {/* Left: Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between w-full md:w-1/2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm space-y-2"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#00AD25]" />
              <h2 className="text-sm font-semibold text-gray-800">AI Image Generator</h2>
            </div>
            <p className="text-xs text-gray-500 font-light">
              Describe your image to generate variations.
            </p>

            <textarea
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border mt-1 outline-none rounded-md border-gray-300 p-2 w-full text-xs"
              placeholder="Enter image description..."
              required
            />

            <div className="mt-2">
              <p className="font-medium text-xs mb-1 text-gray-700">Select Image Style:</p>
              <div className="flex gap-1.5 flex-wrap">
                {Imagestyle.map((option) => (
                  <span
                    key={option}
                    onClick={() => setSelectedstyle(option)}
                    className={`cursor-pointer text-xs px-2.5 py-1 rounded-full border transition 
                      ${selectedstyle === option
                        ? 'bg-green-400 text-white border-green-500'
                        : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'}`}
                  >
                    {option}
                  </span>
                ))}
              </div>

              <div className="my-3 flex items-center gap-2">
                <label className="relative text-xs text-gray-700">
                  <input
                    type="checkbox"
                    onChange={(e) => setPublished(e.target.checked)}
                    className="sr-only peer"
                    checked={published}
                  />
                  <div className="w-8 h-4 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
                  <span className="absolute left-1 top-0.5 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
                </label>
                <span className="text-xs text-gray-600">Publish after generation</span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2 justify-center sm:justify-start">
            <Image className="w-4 h-4 text-[#FF4938]" />
            <ShinyButton
              val="Generate Image"
              cl="bg-gradient-to-r from-[#00AD25] to-[#04FF50]"
              onclick={handleSubmit}
            />
          </div>
        </form>

        {/* Right: Output */}
        <div className="w-full md:w-1/2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
          <div className="mb-1 flex items-center gap-2">
            <Image className="w-4 h-4 text-blue-600" />
            <h1 className="text-sm font-semibold text-gray-800">Generated Images</h1>
          </div>

          <div className="flex-1 flex justify-center items-center text-xs text-gray-700 py-4">
            <div className="flex flex-col items-center text-center gap-1.5 max-w-xs px-2">
              <Hash className="w-4 h-4 text-blue-600" />
              <p>
                This is where the generated images will appear. You can edit, save, or share them.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GenrateIm;

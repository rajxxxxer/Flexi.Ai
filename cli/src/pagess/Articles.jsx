import ShinyButton from '@/compon/ShinyButton';
import { Edit, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

export const Articles = () => {
  const articleLength = [
    { length: 800, text: 'Short (500–800 words)' },
    { length: 1200, text: 'Medium (800–1200 words)' },
    { length: 1600, text: 'Long (1600+ words)' }
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0].length);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Input:', input);
    console.log('Length:', selectedLength);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Left: Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 p-6 bg-white rounded-lg border border-gray-200 shadow-sm space-y-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-blue-600 mb-2" />
          <h2 className="text-lg font-semibold text-gray-800">Article Generator</h2>
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border outline-none rounded-md border-gray-300 p-2 w-full"
          placeholder="Enter article topic..."
        />

        <div>
          <p className="font-medium text-sm mb-2 text-gray-700">Category</p>
          <div className="flex gap-3 flex-wrap">
            {articleLength.map((option, idx) => (
              <span
                key={idx}
                onClick={() => setSelectedLength(option.length)}
                className={`cursor-pointer text-sm px-4 py-2 rounded-md border transition
                ${selectedLength === option.length
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'}`}
              >
                {option.text}
              </span>
            ))}
          </div>
        </div>

         <div className="w-full sm:w-auto mt-4 flex justify-center sm:justify-start">
  <ShinyButton val="Generate-Article" onclick={handleSubmit} />
</div>
      </form>

      {/* Right: Output */}
      <div className="w-full md:w-1/2 p-6 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between min-h-96 max-h-[600px]">
        <div className="mb-4 flex items-center gap-2">
          <Edit className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-800">Generated Article</h1>
        </div>

        <div className="flex-1 text-sm text-gray-700">
          <p>
            This is where the generated article will appear. You can edit it, save it, or share it.
          </p>
        </div>
      </div>
    </div>
  );
};

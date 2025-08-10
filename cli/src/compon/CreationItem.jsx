import { Button } from '@/components/ui/button';
import { Divide } from 'lucide-react';
import React, { useState } from 'react';
import Markdown from 'react-markdown';


const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div onClick={()=>setExpanded(!expanded)} className="w-full mb-4 p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition duration-300">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-gray-800">
            {item.prompt}
          </h2>
          <p className="text-xs text-gray-500">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <Button variant="secondary" className="text-xs px-3 py-1 rounded-md capitalize">
          {item.type}
        </Button>
        {
          <div>
            {expanded && (item.type === 'image' ? (
              <img className='mt-3 w-full h-auto max-w-md rounded-lg bg-cover' src={item.content} alt='img'></img>
            ) : (
             <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-700'>
              <div className='reset-tw'>
                <Markdown>{item.content}</Markdown>
              </div>
              </div>
            ))}
          </div>
        }
       </div>
    </div>
  );
};

export default CreationItem;

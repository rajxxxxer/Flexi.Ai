import React from 'react';

const Testimonial = () => {
  const cardsData = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'Briar Martin',
      handle: '@neilstellar',
      date: 'April 20, 2025',
      review: "Flexi.ai's resume reviewer helped me land 3 interviews in a week — super impressed with the insights!",
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Avery Johnson',
      handle: '@averywrites',
      date: 'May 10, 2025',
      review: "I used Flexi.ai to remove background from product photos. The output was clean and fast!",
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
      name: 'Jordan Lee',
      handle: '@jordantalks',
      date: 'June 5, 2025',
      review: "Flexi.ai’s AI-generated image tool helped me create assets for my website without hiring a designer.",
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
      name: 'Samantha Blake',
      handle: '@samanthablake',
      date: 'May 18, 2025',
      review: "Loved the experience! Everything from resume review to object removal worked like magic.",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
      <div className="flex gap-2">
        <img className="size-11 rounded-full" src={card.image} alt="User" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p>{card.name}</p>
            <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="6" fill="#2196F3" />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800">“{card.review}”</p>
      <div className="flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-1">
          <span>Posted on</span>
          <a href="https://x.com" target="_blank" className="hover:text-sky-500" rel="noreferrer">
            <svg width="11" height="10" viewBox="0 0 11 10" fill="none">
              <circle cx="5.5" cy="5" r="5" fill="currentColor" />
            </svg>
          </a>
        </div>
        <p>{card.date}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="marquee-row">
        <div className="marquee-gradient-left"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="marquee-gradient-right"></div>
      </div>

      <div className="marquee-row">
        <div className="marquee-gradient-left"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="marquee-gradient-right"></div>
      </div>
    </>
  );
};

export default Testimonial;

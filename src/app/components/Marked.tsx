"use client";

import React, { useEffect, useState } from 'react';
import Header from './Header';

interface Film {
  id: number;
  title: string;
  poster_path: string;
}

interface TvSeries {
  id: number;
  name: string;
  poster_path: string;
}

type MarkedItem = Film | TvSeries;

export default function Marked() {
  const [markedItems, setMarkedItems] = useState<MarkedItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const storedMarkedFilms = JSON.parse(localStorage.getItem('markedFilms') || '[]');
    const storedMarkedTvSeries = JSON.parse(localStorage.getItem('markedTvSeries') || '[]');

    const allMarkedItems: MarkedItem[] = [
      ...storedMarkedFilms.map((item: Film) => ({ ...item, poster_path: item.poster_path })),
      ...storedMarkedTvSeries.map((item: TvSeries) => ({ ...item, poster_path: item.poster_path }))
    ];
    setMarkedItems(allMarkedItems);
  }, []);

  const filteredItems = markedItems.filter(item => {
    if ('title' in item) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  return (
    <div className='bg-[#10141E] min-h-screen flex flex-col lg:ml-[90px]'>
      <Header
        img="/assets/home1.svg"
        img2="/assets/movies1.svg"
        img3="/assets/tv1.svg"
        img4="/assets/marked.svg"
      />
      <h1 className='text-[32px] text-white ml-[40px] mt-[40px]'>Marked Items</h1>
      
      <div className='flex'>
        <button>
          <img className='mt-[20px] pl-[20px]' src="/assets/search.svg" alt="search" />
        </button> 
        <input 
          className='w-[277px] h-[48px] text-white text-lg ml-[20px] mt-5 bg-transparent border-b border-gray-500 focus:outline-none' 
          type="text" 
          placeholder='Search for movies or TV series' 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className='relative p-4 w-1/2 md:w-1/4 lg:w-1/6 mt-[20px]'>
              <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={('title' in item ? item.title : item.name)} className='w-full h-auto object-cover rounded-2xl' />
              <h1 className='text-white text-lg mt-2'>{('title' in item ? item.title : item.name)}</h1>
            </div>
          ))
        ) : (
          <p className='text-white ml-[40px] mt-[20px]'>No marked items found.</p>
        )}
      </div>
    </div>
  );
}

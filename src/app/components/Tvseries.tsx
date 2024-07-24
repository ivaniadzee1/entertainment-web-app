"use client";

import { useEffect, useState } from "react";
import Header from "./Header";

interface TvSeries {
  id: number;
  name: string;
  poster_path: string;
  marked: boolean;
}

const getMarkedTvSeries = (): TvSeries[] => {
  return JSON.parse(localStorage.getItem('markedTvSeries') || '[]');
};

const setMarkedTvSeries = (series: TvSeries[]) => {
  localStorage.setItem('markedTvSeries', JSON.stringify(series));
};

export default function Tvseries() {
  const [tvSeries, setTvSeries] = useState<TvSeries[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const apiKey = "4e44d9029b1270a757cddc766a1bcb63";
  const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US`;

  useEffect(() => {
    const fetchTvSeries = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const storedMarkedSeries = getMarkedTvSeries();
        const seriesWithMarkedStatus = data.results.map((series: any) => ({
          ...series,
          marked: storedMarkedSeries.some((markedSeries: TvSeries) => markedSeries.id === series.id),
        }));
        setTvSeries(seriesWithMarkedStatus);
      } catch (error) {
        console.error("Error fetching TV series:", error);
      }
    };

    fetchTvSeries();
  }, [apiUrl]);

  const handleMarked = (id: number) => {
    const updatedSeries = tvSeries.map(series => 
      series.id === id ? { ...series, marked: !series.marked } : series
    );
    setTvSeries(updatedSeries);

    const markedSeries = updatedSeries.filter(series => series.marked);
    setMarkedTvSeries(markedSeries);

    console.log('Marked TV Series Updated:', markedSeries); 
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTvSeries = tvSeries.filter(series =>
    series.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#10141E] min-h-screen flex flex-col lg:ml-[90px]">
      <Header
        img="/assets/home1.svg"
        img2="/assets/movies1.svg"
        img3="/assets/tv.svg"
        img4="/assets/marked1.svg"
      />

      <h1 className='text-[32px] text-white ml-[40px] mt-[40px]'>TV Series</h1>
      
      <div className='flex'>
        <button>
          <img className='mt-[20px] pl-[20px]' src="/assets/search.svg" alt="search" />
        </button> 
        <input 
          className='w-[277px] h-[48px] text-white text-lg ml-[20px] mt-5 bg-transparent border-b border-gray-500 focus:outline-none' 
          type="text" 
          placeholder='Search for TV series' 
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="flex flex-wrap">
        {filteredTvSeries.map((series) => (
          <div key={series.id} className="relative p-4 w-1/2 md:w-1/4 lg:w-1/6 mt-[20px]">
            <button onClick={() => handleMarked(series.id)}>
              <img 
                className='absolute' 
                src={series.marked ? "/assets/mrkd.svg" : "/assets/Unremarkable.svg"} 
                alt="mark" 
              />
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
              alt={series.name}
              className="w-full h-auto rounded-lg"
            />
            <h3 className="text-white mt-2">{series.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from 'react';
import Header from './Header';

interface Film {
  id: number;
  title: string;
  poster_path: string;
  marked: boolean;
}

const getRecommendedFilms = async (): Promise<Film[]> => {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US');
  const data = await res.json();
  return data.results.map((film: any) => ({ ...film, marked: false }));
}

export default function Homepage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      const filmsData = await getRecommendedFilms();
      const storedMarkedFilms = JSON.parse(localStorage.getItem('markedFilms') || '[]');
      const filmsWithMarkedStatus = filmsData.map(film => ({
        ...film,
        marked: storedMarkedFilms.some((markedFilm: Film) => markedFilm.id === film.id),
      }));
      setFilms(filmsWithMarkedStatus);
    };

    fetchFilms();
  }, []);

  const handleMarked = (id: number) => {
    const updatedFilms = films.map(film => film.id === id ? { ...film, marked: !film.marked } : film);
    setFilms(updatedFilms);

    const markedFilms = updatedFilms.filter(film => film.marked);
    const markedFilmDetails = markedFilms.map(film => ({
      id: film.id,
      title: film.title,
      poster_path: film.poster_path
    }));

    localStorage.setItem('markedFilms', JSON.stringify(markedFilmDetails));
  }

  useEffect(() => {
    setFilteredFilms(
      films.filter(film => film.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, films]);

  return (
    <div className='bg-[#10141E] min-h-screen flex flex-col lg:ml-[90px]'>
      <Header 
        img="/assets/home.svg"
        img2="/assets/movies1.svg"
        img3="/assets/tv1.svg"
        img4="/assets/marked1.svg"
      />
      
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
          
      <div className='flex flex-wrap'>
        {filteredFilms.map((film) => (
          <div key={film.id} className='relative p-4 w-1/2 md:w-1/4 lg:w-1/6 mt-[20px]'>
            <button onClick={() => handleMarked(film.id)}>
              <img className='absolute' src={film.marked ? "/assets/mrkd.svg" : "/assets/Unremarkable.svg"} alt="mark" />
            </button>
            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} className='w-full h-auto object-cover rounded-2xl' />
            <h1 className='text-white text-lg mt-2'>{film.title}</h1> 
          </div>
        ))}
      </div>
    </div>
  );
}

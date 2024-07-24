"use client";
import React, { useEffect, useState } from 'react';
import Header from './Header';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  marked: boolean;
}

const getMarkedMovies = (): Movie[] => {
  return JSON.parse(localStorage.getItem('markedFilms') || '[]');
};

const setMarkedMovies = (movies: Movie[]) => {
  localStorage.setItem('markedFilms', JSON.stringify(movies));
};

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US')
      .then(response => response.json())
      .then(data => {
        const storedMarkedMovies = getMarkedMovies();
        const moviesWithMarkedStatus = data.results.map((movie: any) => ({
          ...movie,
          marked: storedMarkedMovies.some((markedMovie: Movie) => markedMovie.id === movie.id),
        }));
        setMovies(moviesWithMarkedStatus);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleMarked = (id: number) => {
    const updatedMovies = movies.map(movie => 
      movie.id === id ? { ...movie, marked: !movie.marked } : movie
    );
    setMovies(updatedMovies);

    const markedMovies = updatedMovies.filter(movie => movie.marked);
    setMarkedMovies(markedMovies);

    console.log('Marked Movies Updated:', markedMovies); 
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='bg-[#10141E] min-h-screen flex flex-col lg:ml-[90px]'>
      <Header
        img="/assets/home1.svg"
        img2="/assets/movies.svg"
        img3="/assets/tv1.svg"
        img4="/assets/marked1.svg"
      />
      <h1 className='text-[32px] text-white ml-[40px] mt-[40px]'>Movies</h1>
        
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

      <div className="flex flex-wrap justify-center">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="relative p-4 w-1/2 md:w-1/4 lg:w-1/6 mt-[20px]">
            <button onClick={() => handleMarked(movie.id)}>
              <img 
                className='absolute' 
                src={movie.marked ? "/assets/mrkd.svg" : "/assets/Unremarkable.svg"} 
                alt="mark" 
              />
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg"
            />
            <h3 className="text-white mt-2 text-center">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;

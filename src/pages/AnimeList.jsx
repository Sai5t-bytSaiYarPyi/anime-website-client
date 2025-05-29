import { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeCard from '../components/AnimeCard';

function AnimeList() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/anime')
      .then(res => setAnimeList(res.data))
      .catch(err => console.error('Error fetching anime:', err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Anime List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {animeList.map(anime => (
          <AnimeCard key={anime._id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default AnimeList;
// client/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeCard from '../components/AnimeCard';

function Home() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    // Fetch anime from backend using environment variable for API URL
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/anime`)
      .then(res => setAnimeList(res.data))
      .catch(err => console.error('Error fetching anime:', err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Featured Anime</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {animeList.map(anime => (
          <AnimeCard key={anime._id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default Home;

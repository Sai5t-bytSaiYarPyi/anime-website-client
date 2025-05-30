// Path: anime-website/client/src/pages/AnimeDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../components/CommentSection';
import RatingSection from '../components/RatingSection';

function AnimeDetail() {
  const { slug } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/anime/${slug}`)
      .then(res => setAnime(res.data))
      .catch(err => console.error('Error fetching anime:', err));
  }, [slug]);

  if (!anime) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <img
          src={anime.cover || 'https://via.placeholder.com/1200x400'}
          alt={anime.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center p-4">
          <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
          <p>Average Rating: {anime.averageRating.toFixed(1)} / 5</p>
          <div className="flex gap-2 mb-4">
            {anime.genres.map(genre => (
              <span key={genre} className="bg-card text-text dark:text-white px-2 py-1 rounded">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-secondary dark:text-gray-400 max-w-2xl">{anime.description}</p>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4">Episodes</h2>
        <div className="space-y-2">
          {anime.episodes.map(episode => (
            <Link
              key={episode.episodeNumber}
              to={`/watch/${anime.slug}/${episode.episodeNumber}`}
            >
              <div className="bg-card dark:bg-gray-800 p-4 rounded-lg hover:bg-gray-700">
                Episode {episode.episodeNumber}: {episode.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <RatingSection animeId={anime._id} />
      <CommentSection animeId={anime._id} />
    </div>
  );
}

export default AnimeDetail;
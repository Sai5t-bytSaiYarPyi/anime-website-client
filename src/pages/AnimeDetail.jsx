import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function AnimeDetail() {
  const { slug } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/anime/${slug}`)
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
          <div className="flex gap-2 mb-4">
            {anime.genres.map(genre => (
              <span key={genre} className="bg-card text-text px-2 py-1 rounded">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-medium mb-4">Description</h2>
        <p className="text-secondary max-w-2xl">{anime.description}</p>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-medium mb-4">Episodes</h2>
        <div className="space-y-2">
          {anime.episodes.map(episode => (
            <Link
              key={episode.episodeNumber}
              to={`/watch/${anime.slug}/${episode.episodeNumber}`}
            >
              <div className="bg-card p-4 rounded-lg hover:bg-primary transition-all">
                Episode {episode.episodeNumber}: {episode.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnimeDetail;
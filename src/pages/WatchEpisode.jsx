import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function WatchEpisode() {
  const { animeSlug, episodeNumber } = useParams();
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/anime/${animeSlug}/episode/${episodeNumber}`)
      .then(res => setEpisode(res.data))
      .catch(err => console.error('Error fetching episode:', err));
  }, [animeSlug, episodeNumber]);

  if (!episode) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{episode.title}</h1>
      <div className="bg-card rounded-lg overflow-hidden">
        <video controls className="w-full h-[675px]">
          <source src={episode.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default WatchEpisode;
// Path: anime-website/client/src/pages/WatchEpisode.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookmarkProgress from '../components/BookmarkProgress';

function WatchEpisode() {
  const { animeSlug, episodeNumber } = useParams();
  const [episode, setEpisode] = useState(null);
  const [anime, setAnime] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/anime/${animeSlug}`)
      .then(res => setAnime(res.data))
      .catch(err => console.error(err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/anime/${animeSlug}/episode/${episodeNumber}`)
      .then(res => setEpisode(res.data))
      .catch(err => console.error('Error fetching episode:', err));
  }, [animeSlug, episodeNumber]);

  if (!episode || !anime) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{episode.title}</h1>
      <div className="bg-card dark:bg-gray-800 rounded-lg overflow-hidden">
        <video ref={videoRef} controls className="w-full h-[675px]">
          <source src={episode.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <BookmarkProgress animeId={anime._id} episodeNumber={parseInt(episodeNumber)} videoRef={videoRef} />
    </div>
  );
}

export default WatchEpisode;
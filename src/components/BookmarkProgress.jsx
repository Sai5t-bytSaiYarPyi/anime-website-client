// Path: anime-website/client/src/components/BookmarkProgress.jsx
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function BookmarkProgress({ animeId, episodeNumber, videoRef }) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && videoRef.current) {
      // Load bookmark
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/bookmarks`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then(res => {
          const bookmark = res.data.find(
            b => b.anime._id === animeId && b.episodeNumber === episodeNumber
          );
          if (bookmark) videoRef.current.currentTime = bookmark.timestamp;
        })
        .catch(err => console.error(err));

      // Save progress on time update
      const handleTimeUpdate = () => {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/bookmarks`,
            {
              animeId,
              episodeNumber,
              timestamp: Math.floor(videoRef.current.currentTime),
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          )
          .catch(err => console.error(err));
      };

      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      return () => videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [user, animeId, episodeNumber, videoRef]);

  return null; // No UI, just logic
}

export default BookmarkProgress;
// Path: anime-website/client/src/components/RatingSection.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function RatingSection({ animeId }) {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/ratings/${animeId}`)
      .then(res => {
        const ratings = res.data;
        const avg = ratings.length
          ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
          : 0;
        setAvgRating(avg);
        const userRating = ratings.find(r => r.user._id === user?._id);
        if (userRating) setRating(userRating.score);
      })
      .catch(err => console.error(err));
  }, [animeId, user]);

  const handleRating = async score => {
    if (!user) return alert('Please log in to rate');
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ratings/${animeId}`,
        { score },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setRating(score);
      // Refresh average rating
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/ratings/${animeId}`);
      const avg = res.data.length
        ? res.data.reduce((sum, r) => sum + r.score, 0) / res.data.length
        : 0;
      setAvgRating(avg);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Rate This Anime</h2>
      <p>Average Rating: {avgRating.toFixed(1)} / 5</p>
      {user ? (
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
            >
              ★
            </button>
          ))}
        </div>
      ) : (
        <p>Please log in to rate.</p>
      )}
    </div>
  );
}

export default RatingSection;
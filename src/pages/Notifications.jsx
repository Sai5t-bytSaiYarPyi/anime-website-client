// Path: anime-website/client/src/pages/Notifications.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Notifications() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then(res => setNotifications(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const markAsRead = async id => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNotifications(notifications.map(n => (n._id === id ? { ...n, read: true } : n)));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div className="container mx-auto px-4 py-8">Please log in.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        notifications.map(notification => (
          <div
            key={notification._id}
            className={`p-4 rounded mb-2 ${notification.read ? 'bg-gray-800' : 'bg-blue-900'}`}
          >
            <p>{notification.message}</p>
            {notification.relatedAnime && (
              <Link
                to={`/anime/${notification.relatedAnime.slug}`}
                className="text-blue-400 hover:underline"
              >
                {notification.relatedAnime.title}
              </Link>
            )}
            <p className="text-sm text-gray-400">
              {new Date(notification.createdAt).toLocaleDateString()}
            </p>
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification._id)}
                className="text-blue-500 hover:underline"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;
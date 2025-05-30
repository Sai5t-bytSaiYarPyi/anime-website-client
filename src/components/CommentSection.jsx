// Path: anime-website/client/src/components/CommentSection.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function CommentSection({ animeId }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/comments/${animeId}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [animeId]);

  const handleAddComment = async e => {
    e.preventDefault();
    if (!user) return alert('Please log in to comment');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/comments/${animeId}`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReply = async (commentId, e) => {
    e.preventDefault();
    if (!user) return alert('Please log in to reply');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/comments/${commentId}/reply`,
        { text: replyText[commentId] || '' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setComments(comments.map(c => (c._id === commentId ? res.data : c)));
      setReplyText({ ...replyText, [commentId]: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {user ? (
        <form onSubmit={handleAddComment} className="mb-4">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 bg-gray-800 text-white rounded"
            required
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
            Post Comment
          </button>
        </form>
      ) : (
        <p className="mb-4">Please log in to comment.</p>
      )}
      {comments.map(comment => (
        <div key={comment._id} className="bg-gray-800 p-4 rounded mb-4">
          <p className="font-bold">{comment.user.username}</p>
          <p>{comment.text}</p>
          <p className="text-sm text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</p>
          <div className="ml-4 mt-2">
            {comment.replies.map(reply => (
              <div key={reply._id} className="bg-gray-700 p-2 rounded mb-2">
                <p className="font-bold">{reply.user.username}</p>
                <p>{reply.text}</p>
                <p className="text-sm text-gray-400">{new Date(reply.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
            {user && (
              <form onSubmit={e => handleAddReply(comment._id, e)} className="mt-2">
                <input
                  type="text"
                  value={replyText[comment._id] || ''}
                  onChange={e => setReplyText({ ...replyText, [comment._id]: e.target.value })}
                  placeholder="Add a reply..."
                  className="w-full p-2 bg-gray-900 text-white rounded"
                />
                <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
                  Reply
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
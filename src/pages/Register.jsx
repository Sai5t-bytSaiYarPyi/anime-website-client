// Path: anime-website/client/src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
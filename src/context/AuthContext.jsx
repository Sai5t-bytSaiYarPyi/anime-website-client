// Path: anime-website/client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, {
      email,
      password,
    });
    localStorage.setItem('token', res.data.token);
    const profile = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${res.data.token}` },
    });
    setUser(profile.data);
  };

  const register = async (username, email, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
      username,
      email,
      password,
    });
    localStorage.setItem('token', res.data.token);
    const profile = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${res.data.token}` },
    });
    setUser(profile.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// Path: anime-website/client/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import AnimeList from './pages/AnimeList';
import AnimeDetail from './pages/AnimeDetail';
import WatchEpisode from './pages/WatchEpisode';
import Notifications from './pages/Notifications.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background dark:bg-dark-background text-text dark:text-dark-text">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime" element={<AnimeList />} />
              <Route path="/anime/:slug" element={<AnimeDetail />} />
              <Route path="/watch/:animeSlug/:episodeNumber" element={<WatchEpisode />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
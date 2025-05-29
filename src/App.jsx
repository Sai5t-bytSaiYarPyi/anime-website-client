import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AnimeList from './pages/AnimeList';
import AnimeDetail from './pages/AnimeDetail';
import WatchEpisode from './pages/WatchEpisode';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-text">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<AnimeList />} />
          <Route path="/anime/:slug" element={<AnimeDetail />} />
          <Route path="/watch/:animeSlug/:episodeNumber" element={<WatchEpisode />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
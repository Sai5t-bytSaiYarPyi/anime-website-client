import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-background border-b border-card sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          AnimeStream
        </Link>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-card text-text p-2 rounded-lg"
          />
          <Link to="/anime" className="text-text hover:text-primary">
            Anime List
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import { Link } from 'react-router-dom';

function AnimeCard({ anime }) {
  return (
    <Link to={`/anime/${anime.slug}`}>
      <div className="bg-card rounded-lg overflow-hidden hover:scale-105 transition-all shadow-md">
        <img
          src={anime.cover || 'https://via.placeholder.com/200x250'}
          alt={anime.title}
          className="w-full h-[250px] object-cover"
        />
        <p className="p-4 text-center text-text font-bold">{anime.title}</p>
      </div>
    </Link>
  );
}

export default AnimeCard;
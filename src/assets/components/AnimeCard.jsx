const AnimeCard = ({ anime }) => {
  return (
    <div className="bg-[#2A2A4A] rounded-lg overflow-hidden hover:scale-105 transition-all shadow-md">
      <img src={anime.thumbnail} alt={anime.title} className="w-full h-[250px] object-cover" />
      <p className="p-4 text-center text-[#EAEAEA] font-bold">{anime.title}</p>
    </div>
  );
};

export default AnimeCard;
const Navbar = () => {
  return (
    <nav className="bg-[#1B1B2F] border-b border-[#2A2A4A] sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#FF4C60]">AnimeStream</div>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#2A2A4A] text-[#EAEAEA] p-2 rounded-lg"
          />
          <a href="/" className="text-[#EAEAEA] hover:text-[#FF4C60]">
            Home
          </a>
          <a href="/anime-list" className="text-[#EAEAEA] hover:text-[#FF4C60]">
            Anime List
          </a>
          <a href="/about" className="text-[#EAEAEA] hover:text-[#FF4C60]">
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
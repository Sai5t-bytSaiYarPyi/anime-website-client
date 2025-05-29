const Footer = () => {
  return (
    <footer className="bg-[#2A2A4A] text-[#A0A0A0] py-4 text-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-4 mb-2">
          <a href="/about" className="hover:text-[#FF4C60]">
            About
          </a>
          <a href="/contact" className="hover:text-[#FF4C60]">
            Contact
          </a>
          <a href="/terms" className="hover:text-[#FF4C60]">
            Terms
          </a>
        </div>
        <p>&copy; 2025 AnimeStream. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
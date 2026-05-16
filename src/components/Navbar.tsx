import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpg'; 

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 antialiased sticky top-0 z-50 w-full">
      {/* Increased max-width to 7xl and h-20 to give the larger logo room to breathe */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between w-full">
        
        {/* Clickable Brand Logo Area */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0">
          <img 
            src={logoImg} 
            alt="Rugby Fan" 
            {/* Switched h-10 to h-14 to instantly make your logo larger on screen */}
            className="h-14 w-auto object-contain block" 
          />
        </Link>

        {/* Full Restored Navigation Links */}
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-600 shrink-0">
          <Link to="/" className="hover:text-[#002366] transition-colors">Home</Link>
          <Link to="/clubs" className="hover:text-[#002366] transition-colors">Directory</Link>
          <Link to="/contact" className="hover:text-[#002366] transition-colors">Contact</Link>
        </div>

      </div>
    </nav>
  );
}

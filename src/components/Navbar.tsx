import { Link } from 'react-router-dom';
// Pulls the image directly from your new assets directory
import logoImg from '../assets/logo.jpg';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 antialiased sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Clickable Brand Logo Area */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img 
            src={logoImg} 
            alt="Rugby Fan" 
            className="h-10 w-auto object-contain block" 
          />
        </Link>

        {/* Navigation Action Links */}
        <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-slate-600">
          <Link to="/clubs" className="hover:text-[#002366] transition-colors">Directory</Link>
          <Link to="/contact" className="hover:text-[#002366] transition-colors">Contact</Link>
        </div>

      </div>
    </nav>
  );
}

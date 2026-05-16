import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/clubs', label: 'Clubs Directory' },
  { to: '/business-network', label: 'Business Network' },
  { to: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Container height increased to h-24 to accommodate the larger logo */}
        <div className="flex items-center justify-between h-24">
          
          {/* Brand Logo Section - Maximize image prominence */}
          <Link to="/" className="flex items-center shrink-0 py-2">
            <img 
              src={logoImg} 
              alt="Rugby Fan" 
              className="h-20 w-auto object-contain block" 
            />
          </Link>

          {/* Centralized Main Menu Layout Wrapper */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-10 mx-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                  location.pathname === link.to ? 'text-[#002366]' : 'text-slate-500 hover:text-[#002366]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Explicitly Isolated Right Side Call-To-Action Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-2.5 bg-[#002366] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Area */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-slate-400 hover:text-[#002366] shrink-0">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Dropdown List */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block text-sm font-bold uppercase tracking-wider py-2 ${
                  location.pathname === link.to ? 'text-[#002366]' : 'text-slate-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-6 py-2.5 bg-[#002366] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

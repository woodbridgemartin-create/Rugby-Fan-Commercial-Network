
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/clubs', label: 'Clubs' }, // This now powers your entire live search directory layout
  { to: '/business-network', label: 'Business Network' },
  { to: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#002366] rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">RF</span>
            </div>
            <span className="text-xl font-bold text-[#002366] tracking-tight">
              Rugby Fan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-[#002366]'
                    : 'text-slate-400 hover:text-[#002366]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 inline-flex items-center px-6 py-2.5 bg-[#002366] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-slate-400 hover:text-[#002366]"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Navigation */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block text-xs font-bold uppercase tracking-wider py-2 ${
                  location.pathname === link.to
                    ? 'text-[#002366]'
                    : 'text-slate-400'
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

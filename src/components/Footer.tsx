import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-800 pb-8 mb-8">
          
          {/* Main Brand Section - Removed the extra RF letters */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Rugby Fan
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The UK's Commercial Rugby Network. Connecting clubs with businesses across the rugby community.
            </p>
          </div>

          {/* Quick Links Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-300 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/clubs" className="hover:text-white transition-colors">Clubs Directory</Link></li>
              <li><Link to="/business-network" className="hover:text-white transition-colors">Business Network</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Support</h4>
            <ul className="space-y-2 text-sm text-slate-300 font-medium">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li className="text-slate-500">United Kingdom</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <div>
            &copy; {currentYear} Rugby Fan. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="text-slate-600">Commercial Rugby Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

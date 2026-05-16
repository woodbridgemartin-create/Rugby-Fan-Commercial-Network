import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info - RF Icon Box removed entirely */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="text-xl font-bold text-white tracking-tight">Rugby Fan</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              The UK's Commercial Rugby Network. Connecting clubs with businesses across the rugby community.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/clubs" className="hover:text-white transition-colors">Clubs Directory</Link></li>
              <li><Link to="/business-network" className="hover:text-white transition-colors">Business Network</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li>United Kingdom</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-wider text-slate-500">
          <p>&copy; 2026 Rugby Fan. All rights reserved.</p>
          <p>Commercial Rugby Network</p>
        </div>
      </div>
    </footer>
  );
}

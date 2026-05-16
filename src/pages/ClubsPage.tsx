import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Megaphone, TrendingUp, Shield, ArrowRight, Search, MapPin, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';

const benefits = [
  { icon: Megaphone, title: 'Attract Sponsors', description: 'Get visible to businesses actively looking to sponsor rugby clubs at every level.' },
  { icon: Users, title: 'Expand Your Network', description: 'Connect with a curated community of commercial partners and service providers.' },
  { icon: TrendingUp, title: 'Increase Revenue', description: 'Unlock new commercial opportunities and diversify your income streams.' },
  { icon: Shield, title: 'Trusted Partners', description: 'All businesses in our network are vetted, ensuring quality and reliability.' },
];

interface Club {
  id: string;
  name: string;
  location: string;
  description: string;
  website: string | null;
  logo_url: string | null;
  logo: string | null;
  club_badge: string | null;
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getClubs() {
      try {
        const { data, error } = await supabase.from('clubs').select('*').order('name', { ascending: true });
        if (!error && data) setClubs(data);
      } catch (err) {
        console.error('Error loading clubs directory:', err);
      } finally {
        setLoading(false);
      }
    }
    getClubs();
  }, []);

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(search.toLowerCase()) ||
    club.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Club Marketing Header Hero */}
      <section className="bg-[#002366]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6">For Rugby Clubs</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white uppercase leading-[1.1] mb-6 tracking-tight">
              Unlock Commercial Potential for Your Club
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-4">
              Join the network that connects your club with sponsors, partners, and commercial opportunities tailored to the rugby community.
            </p>
            <p className="text-white font-bold text-lg mb-10">Free for clubs. Forever.</p>
            <Link
              to="/club-registration"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#002366] font-bold text-sm uppercase tracking-wider rounded hover:bg-gray-100 transition-colors duration-200"
            >
              Register Your Club Free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Free Registered Clubs Directory */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Registered Clubs Directory</h2>
              <p className="text-sm text-slate-500 mt-1">Browse and connect with rugby clubs nationwide.</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by club name or town..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400 text-sm">Loading clubs profile records...</div>
          ) : filteredClubs.length === 0 ? (
            <div className="text-center bg-white border border-slate-200 rounded-lg py-16 px-4">
              <p className="text-slate-400 text-sm">No registered clubs found matching that search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => {
                const logo = club.logo_url || club.logo || club.club_badge;
                return (
                  <div key={club.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        {logo ? (
                          <img src={logo} alt="" className="w-14 h-14 object-contain rounded border border-slate-100 p-1 bg-white" />
                        ) : (
                          <div className="w-14 h-14 bg-[#002366] text-white rounded flex items-center justify-center font-bold text-xl">
                            {club.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-slate-900 text-base leading-tight">{club.name}</h3>
                          <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                            <MapPin size={12} />
                            <span>{club.location}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6">{club.description || 'No description provided.'}</p>
                    </div>
                    {club.website && (
                      <a href={club.website} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded transition-colors">
                        <Globe size={12} /> Visit Website
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Club Benefits Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-2xl mb-16">
            <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-4">Why Join</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Benefits for Clubs</h2>
            <p className="text-slate-500 text-lg">Rugby Fan gives your club the commercial edge it deserves without costing a penny.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 rounded-lg overflow-hidden">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white p-8 flex gap-5">
                <div className="w-10 h-10 shrink-0 rounded bg-[#002366] flex items-center justify-center">
                  <b.icon size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

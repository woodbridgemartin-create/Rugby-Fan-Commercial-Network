
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Globe, Mail, ChevronDown, ChevronUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Club {
  id: string;
  name: string;
  location: string;
  description: string;
  website: string | null;
  email: string | null;
  logo_url: string | null;
  logo: string | null;
  club_badge: string | null;
  looking_for?: string | null;
  club_structure?: string | null;
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedClubId, setExpandedClubId] = useState<string | null>(null);

  useEffect(() => {
    async function getClubs() {
      try {
        const { data, error } = await supabase.from('clubs').select('*').order('name', { ascending: true });
        if (!error && data) setClubs(data);
      } catch (err) {
        console.error('Error loading clubs:', err);
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

  const toggleExpand = (id: string) => {
    setExpandedClubId(expandedClubId === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Consistent Clean White/Navy Top Header */}
      <section className="bg-white border-b border-slate-100 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] bg-slate-100 px-3 py-1.5 rounded">Grassroots & Elite Ecosystem</span>
            <h1 className="text-3xl lg:text-5xl font-black text-[#002366] uppercase tracking-tight mt-6 mb-4">
              Rugby Clubs Directory
            </h1>
            <p className="text-base text-slate-500 leading-relaxed mb-6">
              Discover and connect with rugby clubs nationwide. Explore operational frameworks, community networks, and open commercial placements. **Free for clubs. Forever.**
            </p>
            <Link
              to="/club-registration"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#002366] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#001a4d] transition-all"
            >
              Register Your Club Free
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Directory Search Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Active Club Profiles</h2>
            <p className="text-xs text-slate-400">Click any club card profile to reveal full commercial demands and contact lines.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by club name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs tracking-wider uppercase">Loading database sync...</div>
        ) : filteredClubs.length === 0 ? (
          <div className="text-center bg-slate-50 border border-slate-200 rounded-lg py-12">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">No matching profiles located</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClubs.map((club) => {
              const logo = club.logo_url || club.logo || club.club_badge;
              const isExpanded = expandedClubId === club.id;

              return (
                <div 
                  key={club.id} 
                  className={`bg-white border transition-all duration-200 rounded-lg overflow-hidden cursor-pointer ${
                    isExpanded ? 'border-[#002366] shadow-md' : 'border-slate-200 hover:border-slate-400 shadow-sm'
                  }`}
                  onClick={() => toggleExpand(club.id)}
                >
                  {/* Master Card Row */}
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {logo ? (
                        <img src={logo} alt="" className="w-16 h-16 object-contain rounded border border-slate-100 p-1 bg-white shrink-0" />
                      ) : (
                        <div className="w-16 h-16 bg-[#002366] text-white rounded flex items-center justify-center font-black text-xl shrink-0">
                          {club.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg leading-tight flex items-center gap-2">
                          {club.name}
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            <ShieldCheck size={10} /> Free Verified
                          </span>
                        </h3>
                        <div className="flex items-center gap-1 text-slate-400 text-xs mt-1 font-medium">
                          <MapPin size={12} />
                          <span>{club.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end sm:self-center text-[#002366] text-xs font-bold uppercase tracking-wider">
                      <span>{isExpanded ? 'Show Less' : 'View Full Profile'}</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Collapsible Deep Profile Content Panel */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-6" onClick={(e) => e.stopPropagation()}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-[#002366] uppercase tracking-wider mb-1">About Our Club</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">{club.description || 'No detailed overview provided yet.'}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#002366] uppercase tracking-wider mb-1">Commercial Desires & Structural Target</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-white border border-slate-100 p-3 rounded italic">
                              "{club.looking_for || 'Actively seeking community sponsors, kit partners, and local equipment allocations.'}"
                            </p>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4 self-start shadow-sm">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Profile Overview</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between"><span className="text-slate-400">Location:</span><span className="font-bold text-slate-700">{club.location}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Structure:</span><span className="font-bold text-slate-700">{club.club_structure || 'Grassroots Community'}</span></div>
                          </div>
                          
                          <div className="pt-2 space-y-2">
                            {club.website && (
                              <a href={club.website.startsWith('http') ? club.website : `https://${club.website}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded transition-colors">
                                <Globe size={12} /> Visit Web Domain
                              </a>
                            )}
                            {club.email && (
                              <a href={`mailto:${club.email}?subject=Rugby%20Fan%20Network%20Inquiry`} className="flex items-center justify-center gap-2 w-full py-2 bg-[#002366] hover:bg-[#001a4d] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors">
                                <Mail size={12} /> Contact via Email
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

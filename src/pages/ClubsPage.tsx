import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Search, MapPin, Globe, Mail, User, ChevronDown, ChevronUp, Trophy, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Club {
  id: string;
  name: string;
  league: string;
  location: string;
  description: string | null;
  website: string | null;
  facebook_url: string | null;
  email: string | null;
  contact_name: string | null;
  logo_url: string | null;
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
    club.location.toLowerCase().includes(search.toLowerCase()) ||
    club.league.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen p-6 antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Banner */}
        <div className="bg-[#002366] text-white p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">Grassroots Hub</span>
            <h1 className="text-3xl font-black uppercase tracking-tight">Rugby Club Directory</h1>
            <p className="text-slate-300 text-xs mt-1 max-w-xl">
              Businesses: Discover grassroots rugby clubs looking for investment partners. Connect directly to discuss shirt configurations, ground assets, or digital sponsorship options.
            </p>
          </div>
          <RouterLink to="/club-registration" className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#002366] font-bold text-xs uppercase tracking-wider rounded shadow hover:bg-slate-100 shrink-0 transition-colors">
            Register Your Club <ArrowRight size={14} />
          </RouterLink>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search clubs by name, town, or league structure..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#002366]"
            />
          </div>
        </div>

        {/* Main List Layout */}
        {loading ? (
          <div className="text-center py-12 text-xs font-bold text-slate-400 tracking-wider uppercase">Loading directory...</div>
        ) : (
          <div className="space-y-3">
            {filteredClubs.map((club) => {
              const isExpanded = expandedClubId === club.id;
              return (
                <div 
                  key={club.id} 
                  onClick={() => setExpandedClubId(isExpanded ? null : club.id)}
                  className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all ${isExpanded ? 'border-[#002366] shadow' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {/* Summary Card Row */}
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {club.logo_url && club.logo_url.trim() !== '' ? (
                        <div className="w-12 h-12 rounded-lg border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0">
                          <img src={club.logo_url} alt={`${club.name} badge`} className="w-full h-full object-contain p-1" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-slate-100 text-[#002366] border border-slate-200 rounded-lg flex items-center justify-center font-black text-lg shrink-0">
                          {club.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{club.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1 font-medium">
                          <span className="text-[#002366] font-bold uppercase text-[10px] tracking-wider">
                            <Trophy size={11} className="inline mr-1" />{club.league}
                          </span>
                          <span>
                            <MapPin size={11} className="inline mr-0.5" />{club.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#002366] text-xs font-bold uppercase tracking-wider self-end sm:self-center">
                      <span>{isExpanded ? 'Hide Info' : 'View Info'}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </div>

                  {/* Expanded Section (Shows custom user content) */}
                  {isExpanded && (
                    <div className="p-5 border-t border-slate-100 bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-6" onClick={(e) => e.stopPropagation()}>
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Sponsorship Packages & Club Requirements</h4>
                          <div className="text-xs text-slate-700 leading-relaxed mt-1 bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-line font-medium">
                            {club.description && club.description.trim() !== '' ? (
                              club.description
                            ) : (
                              <span className="text-slate-400 italic">No custom description or asset details provided yet. Use the contact options on the side to inquire.</span>
                            )}
                          </div>
                        </div>

                        {club.contact_name && (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-lg w-fit shadow-sm">
                            <User size={13} className="text-[#002366]" />
                            <span>Primary Contact: {club.contact_name}</span>
                          </div>
                        )}
                      </div>

                      {/* Direct Channels */}
                      <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2.5 shadow-sm text-xs self-start">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Connect Directly</h4>
                        
                        {club.email && (
                          <a href={`mailto:${club.email}`} className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-[#002366] text-white rounded font-bold uppercase tracking-wider text-[10px] hover:bg-[#001a4d] transition-colors">
                            <Mail size={12} /> Email Club Representative
                          </a>
                        )}

                        {club.website && (
                          <a href={club.website} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-slate-100 text-slate-700 rounded font-semibold text-[10px] border border-slate-200 hover:bg-slate-200 transition-colors">
                            <Globe size={12} className="text-slate-400" /> Open Club Website
                          </a>
                        )}

                        {club.facebook_url && (
                          <a href={club.facebook_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-slate-100 text-slate-700 rounded font-semibold text-[10px] border border-slate-200 hover:bg-slate-200 transition-colors">
                            <svg className="w-3 h-3 text-blue-600 fill-current" viewBox="0 0 24 24">
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                            Open Facebook Page
                          </a>
                        )}

                        {!club.website && !club.facebook_url && (
                          <span className="text-center block text-slate-400 text-[10px] italic py-1">No external platforms linked.</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Search, MapPin, Globe, Mail, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Club {
  id: string;
  name: string;
  location: string;
  description: string;
  website: string;
  contact_email: string;
  logo_url: string;
}

export default function ClubsDirectoryPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClubs() {
      const { data, error } = await supabase
        .from('clubs')
        .select('*')
        .order('name', { ascending: true });

      if (!error && data) {
        setClubs(data);
      }
      setLoading(false);
    }
    fetchClubs();
  } [], []);

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(search.toLowerCase()) ||
    club.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-2">Rugby Fan Network</p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">Registered Rugby Clubs</h1>
          <p className="text-slate-500 mt-3">Discover and connect with grassroots and community rugby clubs across the network.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clubs by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
          />
        </div>

        {/* Directory Grid Layout */}
        {loading ? (
          <div className="text-center text-slate-400 py-12 font-mono text-xs">Loading network profiles...</div>
        ) : filteredClubs.length === 0 ? (
          <div className="text-center text-slate-500 py-12 bg-white border border-slate-200 rounded-lg">
            No clubs found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <div key={club.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    {club.logo_url ? (
                      <img src={club.logo_url} alt={`${club.name} badge`} className="w-14 h-14 object-contain rounded bg-slate-50 p-1 shrink-0 border border-slate-100" />
                    ) : (
                      <div className="w-14 h-14 bg-slate-100 rounded flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                        <Shield size={24} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-tight">{club.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-slate-400" />
                        {club.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-6">{club.description || 'No description provided yet.'}</p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
                  {club.website && (
                    <a href={club.website.startsWith('http') ? club.website : `https://${club.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-[#002366] hover:text-white hover:border-[#002366] transition-all">
                      <Globe size={12} />
                      Website
                    </a>
                  )}
                  {club.contact_email && (
                    <a href={`mailto:${club.contact_email}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-[#002366] hover:text-white hover:border-[#002366] transition-all">
                      <Mail size={12} />
                      Contact
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

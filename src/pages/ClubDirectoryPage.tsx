import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Globe, Mail, ChevronDown, ChevronUp, Shield, CheckCircle, ArrowRight, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Club {
  id: string;
  name: string;
  location: string;
  league?: string | null;
  summary?: string | null;
  infrastructure_needs?: string | null;
  website?: string | null;
  main_contact_email?: string | null;
  logo_url?: string | null;
}

export default function ClubsDirectoryPage() {
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

  const filteredClubs = clubs.filter(club => {
    return club.name.toLowerCase().includes(search.toLowerCase()) || 
           club.location.toLowerCase().includes(search.toLowerCase()) ||
           (club.league && club.league.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div className="bg-white min-h-screen antialiased">
      
      {/* SECTION 1: Brand Header & Club Benefits Dashboard */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Title Pitch */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center text-[#002366] text-xs font-bold uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1.5 rounded">
              Rugby Club Registry
            </span>
            <h1 className="text-3xl lg:text-5xl font-black text-[#002366] uppercase tracking-tight leading-none">
              Registered Rugby Clubs
            </h1>
            <p className="text-base text-slate-500 leading-relaxed max-w-xl">
              Browse community and semi-professional rugby clubs seeking commercial backing, kit sponsorship setups, and asset development partnerships.
            </p>
            <Link
              to="/club-registration"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#002366] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#001a4d] transition-all shadow-sm"
            >
              Register Your Club Profile
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Club Benefits Information Box */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-5 shadow-sm">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#002366]">Why Register Your Club?</h3>
              <p className="text-xs text-slate-400 mt-0.5">Unlock vital financial pipelines and community visibility.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-600" /> B2B Marketplace
                </h4>
                <p className="text-[11px] text-slate-500 leading-normal">Get discovered straight by businesses waiting to fund kit packages and pitchside layouts.</p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-600" /> Infrastructure Funding
                </h4>
                <p className="text-[11px] text-slate-500 leading-normal">List your explicit facility needs (clubhouse updates, lighting, kit) directly to corporate target investors.</p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-600" /> SEO Brand Promotion
                </h4>
                <p className="text-[11px] text-slate-500 leading-normal">Increase local community awareness to drive higher gate-receipts, matchday crowds, and new member signs.</p>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-600" /> Zero Asset Costs
                </h4>
                <p className="text-[11px] text-slate-500 leading-normal">Keeping database registries completely open and free for grassroots installations forever.</p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* SECTION 2: Control Hub Search Strip */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Filter Active Directories</h2>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by club name, league, region..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE CLICKABLE RECORDS GRID */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-16 text-slate-400 text-xs tracking-widest uppercase font-bold">Syncing live club records...</div>
        ) : filteredClubs.length === 0 ? (
          <div className="text-center bg-slate-50 border border-slate-200 rounded-xl py-16 px-4">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">No rugby clubs found matching that query</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClubs.map((club) => {
              const isExpanded = expandedClubId === club.id;

              return (
                <div 
                  key={club.id} 
                  className={`bg-white border transition-all duration-200 rounded-xl overflow-hidden cursor-pointer ${
                    isExpanded ? 'border-[#002366] shadow-md' : 'border-slate-200 hover:border-slate-400 shadow-sm'
                  }`}
                  onClick={() => setExpandedClubId(isExpanded ? null : club.id)}
                >
                  {/* Master Card Row Layout */}
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {club.logo_url ? (
                        <img src={club.logo_url} alt="" className="w-14 h-14 object-contain rounded-lg border border-slate-100 p-1 bg-white shrink-0" />
                      ) : (
                        <div className="w-14 h-14 bg-blue-50 text-[#002366] border border-blue-100 rounded-lg flex items-center justify-center font-black text-xl shrink-0">
                          {club.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 text-base lg:text-lg leading-tight flex items-center gap-2">
                          {club.name}
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                            <Shield size={10} /> Registered Club
                          </span>
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-xs mt-1.5 font-medium">
                          <span className="inline-flex items-center gap-1 text-[#002366] font-bold uppercase tracking-wider text-[10px]">
                            <Award size={11} /> {club.league || 'Regional Framework'}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <MapPin size={11} /> {club.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end sm:self-center text-[#002366] text-xs font-bold uppercase tracking-wider">
                      <span>{isExpanded ? 'Hide Details' : 'View Club Pitch'}</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Deep Club Proposal Profile Panel - Opens on Click */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-6" onClick={(e) => e.stopPropagation()}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-[#002366] uppercase tracking-wider mb-1">Club Overview & Community Summary</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">{club.summary || 'No descriptive overview filled out yet.'}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#002366] uppercase tracking-wider mb-1">Target Commercial Requirements & Infrastructure Needs</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-white border border-slate-100 p-3 rounded-lg italic">
                              "{club.infrastructure_needs || 'Currently welcoming inquiries for standard main-kit placement setups, board inventory branding, or digital reach.'}"
                            </p>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4 self-start shadow-sm">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Club Profile Channels</h4>
                          
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between"><span className="text-slate-400">Current Base:</span><span className="font-bold text-slate-700">{club.location}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Competition:</span><span className="font-bold text-slate-700">{club.league || 'Community League'}</span></div>
                          </div>
                          
                          <div className="pt-2 space-y-2 border-t border-slate-100">
                            {club.website && (
                              <a href={club.website.startsWith('http

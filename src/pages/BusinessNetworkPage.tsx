import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Shield, Handshake, Award, ArrowRight, Search, MapPin, Globe, Briefcase } from 'lucide-react';
import { supabase } from '../lib/supabase';

const bizBenefits = [
  { icon: Target, title: 'Targeted Exposure', description: 'Position your business directly in front of club decision-makers, players, and local rugby communities.' },
  { icon: Handshake, title: 'Direct Sponsorships', description: 'Seamlessly find clubs seeking everything from kit sponsorships to stadium asset rights.' },
  { icon: Shield, title: 'B2B Trust Badge', description: 'Stand out as an officially verified commercial supplier vetted explicitly for the rugby sector.' },
  { icon: Award, title: 'Community Impact', description: 'Build authentic local brand loyalty by backing grassroots and tier-structured rugby frameworks.' },
];

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  website: string | null;
  logo_url: string | null;
}

export default function BusinessNetworkPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBusinesses() {
      try {
        const { data, error } = await supabase.from('businesses').select('*').order('name', { ascending: true });
        if (!error && data) setBusinesses(data);
      } catch (err) {
        console.error('Error loading business network listings:', err);
      } finally {
        setLoading(false);
      }
    }
    getBusinesses();
  }, []);

  const filteredBiz = businesses.filter(biz =>
    biz.name.toLowerCase().includes(search.toLowerCase()) ||
    (biz.category && biz.category.toLowerCase().includes(search.toLowerCase())) ||
    biz.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Brand-Matched Dark Navy Hero Header */}
      <section className="bg-[#002366]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Commercial Partners</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white uppercase leading-[1.1] mb-6 tracking-tight">
              Sponsor Clubs & Grow Your Business Network
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Connect directly with rugby clubs seeking commercial backing. Gain exclusive access to local networks, decision-makers, and high-impact sports advertising placements.
            </p>
            <Link
              to="/business-registration"
              className="inline-flex items-center gap-2 px-10 py-4 bg-amber-500 text-[#002366] font-bold text-sm uppercase tracking-wider rounded hover:bg-amber-400 transition-colors duration-200 shadow-sm"
            >
              Join the Commercial Network
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Business Directory Lookup */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Verified Commercial Partners</h2>
              <p className="text-sm text-slate-500 mt-1">Discover vetted corporate entities and club service providers.</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by supplier name, industry or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400 text-sm">Loading verified partner registry...</div>
          ) : filteredBiz.length === 0 ? (
            <div className="text-center bg-white border border-slate-200 rounded-lg py-16 px-4">
              <p className="text-slate-400 text-sm">No business network partners match that lookup query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBiz.map((biz) => (
                <div key={biz.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      {biz.logo_url ? (
                        <img src={biz.logo_url} alt="" className="w-14 h-14 object-contain rounded border border-slate-100 p-1 bg-white" />
                      ) : (
                        <div className="w-14 h-14 bg-amber-500 text-[#002366] rounded flex items-center justify-center font-bold text-xl">
                          {biz.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-tight">{biz.name}</h3>
                        <div className="flex flex-col gap-0.5 mt-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#002366]">
                            <Briefcase size={10} /> {biz.category || 'Commercial Partner'}
                          </span>
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <MapPin size={11} /> <span>{biz.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6">{biz.description || 'No description provided.'}</p>
                  </div>
                  {biz.website && (
                    <a href={biz.website} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded transition-colors hover:text-[#002366] hover:border-[#002366]/30">
                      <Globe size={12} /> Contact Partner
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Business Network Benefits Grid Section with Accent Highlights */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-2xl mb-16">
            <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-4">Why Partner With Us</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Commercial Network Benefits</h2>
            <p className="text-slate-500 text-lg">Gain premium marketing reach while helping grassroots and elite rugby structures grow.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 rounded-lg overflow-hidden">
            {bizBenefits.map((b) => (
              <div key={b.title} className="bg-white p-8 flex gap-5">
                <div className="w-10 h-10 shrink-0 rounded bg-[#002366] flex items-center justify-center">
                  <b.icon size={18} className="text-amber-400" />
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

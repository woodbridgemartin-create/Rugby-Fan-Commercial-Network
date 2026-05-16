import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Globe, Mail, ChevronDown, ChevronUp, ArrowRight, Briefcase, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  website: string | null;
  email: string | null;
  logo_url: string | null;
  looking_for?: string | null;
  investment_range?: string | null;
}

export default function BusinessNetworkPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedBizId, setExpandedBizId] = useState<string | null>(null);

  useEffect(() => {
    async function getBusinesses() {
      try {
        const { data, error } = await supabase.from('businesses').select('*').order('name', { ascending: true });
        if (!error && data) setBusinesses(data);
      } catch (err) {
        console.error('Error loading businesses:', err);
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

  const toggleExpand = (id: string) => {
    setExpandedBizId(expandedBizId === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Clean White/Navy Top Header to Match Rest of Site */}
      <section className="bg-white border-b border-slate-100 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em] bg-amber-50 px-3 py-1.5 rounded border border-amber-100">Premium Commercial Tier</span>
            <h1 className="text-3xl lg:text-5xl font-black text-[#002366] uppercase tracking-tight mt-6 mb-4">
              Commercial Business Network
            </h1>
            <p className="text-base text-slate-500 leading-relaxed mb-6">
              Connect directly with verified corporate sponsors and B2B providers backing rugby infrastructures. Access kit allocations, physical marketing placements, and cross-tier network operations.
            </p>
            <Link
              to="/business-registration"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#002366] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#001a4d] transition-all"
            >
              Join Paid Commercial Network
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Directory Search Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Verified Corporate Entities</h2>
            <p className="text-xs text-slate-400">Click any partner row card to read corporate investment objectives and route contacts.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by keyword, domain or industry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs tracking-wider uppercase">Syncing partner registry...</div>
        ) : filteredBiz.length === 0 ? (
          <div className="text-center bg-slate-50 border border-slate-200 rounded-lg py-12">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">No matching corporate logs found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBiz.map((biz) => {
              const isExpanded = expandedBizId === biz.id;

              return (
                <div 
                  key={biz.id} 
                  className={`bg-white border transition-all duration-200 rounded-lg overflow-hidden cursor-pointer ${
                    isExpanded ? 'border-[#002366] shadow-md' : 'border-slate-200 hover:border-slate-400 shadow-sm'
                  }`}
                  onClick={() => toggleExpand(biz.id)}
                >
                  {/* Master Card Row */}
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {biz.logo_url ? (
                        <img src={biz.logo_url} alt="" className="w-16 h-16 object-contain rounded border border-slate-100 p-1 bg-white shrink-0" />
                      ) : (
                        <div className="w-16 h-16 bg-slate-100 text-[#002366] border border-slate-200 rounded flex items-center justify-center font-black text-xl shrink-0">
                          {biz.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg leading-tight flex items-center gap-2">
                          {biz.name}
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                            <Award size={10} /> Corporate Partner
                          </span>
                        </h3>
                        <div className="flex items-center gap-4 text-slate-400 text-xs mt-1.5 font-medium">
                          <span className="inline-flex items-center gap-1 text-[#002366] font-bold uppercase tracking-wider text-[10px]">
                            <Briefcase size={12} /> {biz.category || 'Commercial Network Asset'}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <MapPin size={12} /> {biz.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end sm:self-center text-[#002366] text-xs font-bold uppercase tracking-wider">
                      <span>{isExpanded ? 'Collapse Profile' : 'Expand Details'}</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Collapsible Deep Corporate Profile Content Panel */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-6 space-y-6" onClick={(e) => e.stopPropagation()}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-[#002366] uppercase tracking-wider mb-1">Corporate Profile & Framework</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">{biz.description || 'No descriptive overview filled yet.'}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#002366] uppercase tracking-wider mb-1">Target Sponsorship Strategy & What We Look For</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-white border border-slate-100 p-3 rounded italic">
                              "{biz.looking_for || 'Actively seeking strategic clubs for kit arrangements, asset placements, and operational alignment.'}"
                            </p>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-4 self-start shadow-sm">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Operational Bounds</h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between"><span className="text-slate-400">Industry Sector:</span><span className="font-bold text-slate-700">{biz.category}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Target Range:</span><span className="font-bold text-amber-600">{biz.investment_range || 'Flexible Allocations'}</span></div>
                          </div>
                          
                          <div className="pt-2 space-y-2">
                            {biz.website && (
                              <a href={biz.website.startsWith('http') ? biz.website : `https://${biz.website}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded transition-colors">
                                <Globe size={12} /> Visit Website Link
                              </a>
                            )}
                            {biz.email && (
                              <a href={`mailto:${biz.email}?subject=Rugby%20Fan%20Network%20B2B%20Inquiry`} className="flex items-center justify-center gap-2 w-full py-2 bg-[#002366] hover:bg-[#001a4d] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors">
                                <Mail size={12} /> Contact Corporate Ally
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

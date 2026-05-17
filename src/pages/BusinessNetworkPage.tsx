import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Globe, ArrowRight, Briefcase, User } from 'lucide-react';
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
  contact_name?: string | null;
}

export default function BusinessNetworkPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [customIndustrySearch, setCustomIndustrySearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedBizId, setExpandedBizId] = useState<string | null>(null);

  // Used to dynamically establish what counts as an "Other" custom write-in entry
  const standardIndustries = [
    'Construction & Engineering',
    'Financial Services & Accounting',
    'Technology, Software & IT Support',
    'Hospitality, Catering & Event Management',
    'Legal & Corporate Advisory',
    'Marketing, Print & Creative Media',
    'Retail, Apparel & Merchandise',
    'Logistics, Transport & Supply Chain',
    'Medical, Health & Physiotherapy'
  ];

  useEffect(() => {
    async function getBusinesses() {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('approved', true)
          .order('name', { ascending: true });
          
        if (!error && data) setBusinesses(data);
      } catch (err) {
        console.error('Error loading businesses:', err);
      } finally {
        setLoading(false);
      }
    }
    getBusinesses();
  }, []);

  const filteredBiz = businesses.filter(biz => {
    // 1. Core structural text search matching title/location
    const matchesSearch = biz.name.toLowerCase().includes(search.toLowerCase()) || 
                          biz.location.toLowerCase().includes(search.toLowerCase());
    
    // 2. Industry sector sorting parameter loops
    let matchesIndustry = false;
    if (selectedIndustry === 'All Industries') {
      matchesIndustry = true;
    } else if (selectedIndustry === 'Other') {
      const isCustomCategory = !standardIndustries.includes(biz.category);
      const matchesCustomText = customIndustrySearch.trim() === '' || 
                                biz.category.toLowerCase().includes(customIndustrySearch.toLowerCase());
      matchesIndustry = isCustomCategory && matchesCustomText;
    } else {
      matchesIndustry = biz.category === selectedIndustry;
    }
    
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="bg-slate-50 min-h-screen p-6 antialiased">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="bg-[#002366] text-white p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">Rugby Club Resources</span>
            <h1 className="text-3xl font-black uppercase tracking-tight">Available Corporate Sponsors</h1>
            <p className="text-slate-300 text-xs mt-1 max-w-xl">
              Clubs: Browse trusted businesses across the network ready to fund kit assets, ground perimeter boards, and local community initiatives.
            </p>
          </div>
          <Link to="/business-registration" className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#002366] font-bold text-xs uppercase tracking-wider rounded shadow hover:bg-slate-100 shrink-0 transition-colors">
            List Your Business <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by company name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#002366]"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <select
              value={selectedIndustry}
              onChange={(e) => {
                setSelectedIndustry(e.target.value);
                setCustomIndustrySearch(''); 
              }}
              className="w-full sm:w-64 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-medium focus:outline-none focus:border-[#002366]"
            >
              <option value="All Industries">All Industries</option>
              <option value="Construction & Engineering">Construction & Engineering</option>
              <option value="Financial Services & Accounting">Financial Services & Accounting</option>
              <option value="Technology, Software & IT Support">Technology, Software & IT Support</option>
              <option value="Hospitality, Catering & Event Management">Hospitality & Events</option>
              <option value="Legal & Corporate Advisory">Legal & Corporate Advisory</option>
              <option value="Marketing, Print & Creative Media">Marketing, Print & Creative Media</option>
              <option value="Retail, Apparel & Merchandise">Retail, Apparel & Merchandise</option>
              <option value="Logistics, Transport & Supply Chain">Logistics, Transport & Supply Chain</option>
              <option value="Medical, Health & Physiotherapy">Medical, Health & Physiotherapy</option>
              <option value="Other">Other / Custom Sector</option>
            </select>

            {selectedIndustry === 'Other' && (
              <input
                type="text"
                placeholder="Type industry keyword..."
                value={customIndustrySearch}
                onChange={(e) => setCustomIndustrySearch(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 bg-rose-50/20 border border-rose-200 rounded text-xs focus:outline-none focus:border-rose-400 placeholder:text-slate-400 font-medium"
              />
            )}
          </div>
        </div>

        {/* Main List Layout */}
        {loading ? (
          <div className="text-center py-12 text-xs font-bold text-slate-400 tracking-wider uppercase">Loading live grid...</div>
        ) : (
          <div className="space-y-3">
            {filteredBiz.length === 0 ? (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-xl text-xs text-slate-400 font-medium">
                No matching commercial business partners found for your search criteria.
              </div>
            ) : (
              filteredBiz.map((biz) => {
                const isExpanded = expandedBizId === biz.id;
                return (
                  <div 
                    key={biz.id} 
                    onClick={() => setExpandedBizId(isExpanded ? null : biz.id)}
                    className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all ${isExpanded ? 'border-[#002366] shadow' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {biz.logo_url && biz.logo_url.trim() !== '' ? (
                          <div className="w-12 h-12 rounded-lg border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0">
                            <img 
                              src={biz.logo_url} 
                              alt={`${biz.name} logo`} 
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-slate-100 text-[#002366] border border-slate-200 rounded-lg flex items-center justify-center font-black text-lg shrink-0">
                            {biz.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">{biz.name}</h3>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-medium">
                            <span className="text-[#002366] font-bold uppercase text-[10px] tracking-wider"><Briefcase size={11} className="inline mr-1" />{biz.category}</span>
                            <span><MapPin size={11} className="inline mr-0.5" />{biz.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[#002366] text-xs font-bold uppercase tracking-wider self-end sm:self-center">
                        <span>{isExpanded ? 'Hide Info' : 'View Info'}</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-5 border-t border-slate-100 bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-6" onClick={(e) => e.stopPropagation()}>
                        <div className="md:col-span-2 space-y-3">
                          {biz.contact_name && (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg w-fit">
                              <User size={13} className="text-slate-400" />
                              <span>Contact Person: {biz.contact_name}</span>
                            </div>
                          )}
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profile Overview</h4>
                            <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{biz.description || 'No summary overview provided.'}</p>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sponsorship Objectives</h4>
                            <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded border border-slate-100 mt-0.5">"{biz.looking_for || 'Open to discussing flexible community assets and branding arrangements.'}"</p>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-3 shadow-sm text-xs self-start">
                          <div className="flex justify-between"><span className="text-slate-400">Budget Limit:</span><span className="font-bold text-amber-700">£{biz.investment_range || 'Flexible'}</span></div>
                          <div className="pt-2 border-t border-slate-100 space-y-2">
                            {biz.website ? (
                              <a 
                                href={biz.website.startsWith('http') ? biz.website : `https://${biz.website}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#002366] text-white rounded font-bold uppercase tracking-wider text-[10px] hover:bg-[#001a4d] transition-colors"
                              >
                                <Globe size={12} /> Apply via Website
                              </a>
                            ) : (
                              <span className="text-center block text-slate-400 text-[10px] italic py-2">No external website linked</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>
    </div>
  );
}

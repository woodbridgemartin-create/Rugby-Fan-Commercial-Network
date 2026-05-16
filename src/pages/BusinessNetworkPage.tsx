import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Globe, Mail, ChevronDown, ChevronUp, ArrowRight, Briefcase, Award, CheckCircle } from 'lucide-react';
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

const MAJOR_INDUSTRIES = [
  'All Industries',
  'Construction & Engineering',
  'Financial Services & Accounting',
  'Legal & Corporate Advisory',
  'Logistics, Transport & Shipping',
  'Marketing, Design & Public Relations',
  'Technology, Software & IT Support',
  'Health, Fitness & Sports Therapy',
  'Hospitality, Catering & Event Management',
  'Manufacturing & Industrial Supplies',
  'Real Estate & Property Management',
  'Retail, E-commerce & Merchandising',
  'Recruitment & Human Resources'
];

export default function BusinessNetworkPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
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

  const filteredBiz = businesses.filter(biz => {
    const matchesSearch = biz.name.toLowerCase().includes(search.toLowerCase()) || 
                          biz.location.toLowerCase().includes(search.toLowerCase()) ||
                          (biz.description && biz.description.toLowerCase().includes(search.toLowerCase()));
    
    const matchesIndustry = selectedIndustry === 'All Industries' || 
                            (biz.category && biz.category.trim() === selectedIndustry.trim());

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="bg-white min-h-screen antialiased">
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center text-amber-700 text-xs font-bold uppercase tracking-widest bg-amber-50 border border-amber-100 px-3 py-1.5 rounded">
              Commercial Partners
            </span>
            <h1 className="text-3xl lg:text-5xl font-black text-[#002366] uppercase tracking-tight leading-none">
              Commercial Business Network
            </h1>
            <p className="text-base text-slate-500 leading-relaxed max-w-xl">
              Connect directly with trusted corporate partners and local businesses looking to fund grassroots rugby. Discover available kit sponsorships, pitchside advertising board placements, and match-day community branding opportunities.
            </p>
            <Link
              to="/business-registration"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#002366] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#001a4d] transition-all shadow-sm"
            >
              List Your Business Portfolio
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Network Perks</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#002366] shrink-0 mt-0.5" /> Direct visibility to rugby club committees and decision-makers</li>
              <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#002366] shrink-0 mt-0.5" /> Secure pitchside branding, scoreboard assets, and program ads</li>
              <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#002366] shrink-0 mt-0.5" /> Premium verified business directory profile</li>
            </ul>
          </div>
        </div>
      </header>

      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Search Partners Directory</h2>
              <p className="text-xs text-slate-400 mt-0.5">Filter commercial partners by primary industry or location.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="w-full sm:w-56">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                >
                  {MAJOR_INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by company name, town..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-16 text-slate-400 text-xs tracking-widest uppercase font-bold">Syncing live registry...</div>
        ) : filteredBiz.length === 0 ? (
          <div className="text-center bg-slate-50 border border-slate-200 rounded-xl py-16 px-4">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">No registered partners located matching that query</p>
            <button 
              onClick={() => { setSearch(''); setSelectedIndustry('All Industries'); }}
              className="text-xs text-[#002366] font-bold underline mt-2 uppercase tracking-wider block mx-auto"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBiz.map((biz) => {
              const isExpanded = expandedBizId === biz.id;

              return (
                <div 
                  key={biz.id} 
                  className={`bg-white border transition-all duration-200 rounded-xl overflow-hidden cursor-pointer ${
                    isExpanded ? 'border-[#002366] shadow-md' : 'border-slate-200 hover:border-slate-400 shadow-sm'
                  }`}
                  onClick={() => setExpandedBizId(isExpanded ? null : biz.id)}
                >
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {biz.logo_url ? (
                        <img src={biz.logo_url} alt="" className="w-14 h-14 object-contain rounded-lg border border-slate-100 p-1 bg-white shrink-0" />
                      ) : (
                        <div className="w-14 h-14 bg-slate-50 text-[#002366] border border-slate-200 rounded-lg flex items-center justify-center font-black text-xl shrink-0">
                          {biz.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 text-base lg:text-lg leading-tight flex items-center gap-2">
                          {biz.name}
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                            <Award size={10} /> Verified Partner
                          </span>
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-xs mt-1.5 font-medium">
                          <span className="inline-flex items-center gap-1 text-[#002366] font-bold uppercase tracking-wider text-[10px]">
                            <Briefcase size={11} /> {biz.category || 'Commercial Ally'}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <MapPin size={11} /> {biz.location}
                          </span>
                        </div>
                      </div>

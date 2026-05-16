import { useState, useEffect } from 'react';
import { Search, ListFilter as Filter, ExternalLink, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { businessCategories } from '../lib/categories';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  logo: string | null;
  membership_tier: string;
}

const categories = ['All', ...businessCategories];

const tierBadge: Record<string, { label: string; class: string }> = {
  premium: { label: 'Premium Partner', class: 'bg-[#002366] text-white' },
  founding: { label: 'Premium Partner', class: 'bg-[#002366] text-white' },
  standard: { label: 'Standard', class: 'bg-slate-100 text-slate-600' },
};

export default function DirectoryPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  async function fetchBusinesses() {
    setLoading(true);
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .order('membership_tier', { ascending: true });

    if (!error && data) {
      setBusinesses(data as Business[]);
    }
    setLoading(false);
  }

  const filtered = businesses.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || b.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-20">
          <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            The Directory
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Browse Rugby Businesses
          </h1>
          <p className="text-slate-500 text-lg">
            Discover businesses that serve the UK rugby community, from sponsors to service providers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search businesses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
            />
          </div>
          <div className="relative">
            <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-11 pr-8 py-3 border border-slate-200 rounded text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading directory...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No businesses found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 rounded-lg overflow-hidden">
            {filtered.map((business) => (
              <div
                key={business.id}
                className="bg-white p-6 lg:p-8 hover:bg-slate-50 transition-colors duration-150"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded bg-[#002366]/10 flex items-center justify-center overflow-hidden">
                    {business.logo ? (
                      <img src={business.logo} alt={business.name} className="w-6 h-6 object-contain" />
                    ) : (
                      <span className="text-[#002366] font-bold text-xs">
                        {business.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      tierBadge[business.membership_tier]?.class || tierBadge.standard.class
                    }`}
                  >
                    {(business.membership_tier === 'premium' || business.membership_tier === 'founding') && <Star size={8} />}
                    {tierBadge[business.membership_tier]?.label || 'Standard'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{business.name}</h3>
                <p className="text-[10px] text-[#002366] font-bold uppercase tracking-wider mb-3">{business.category}</p>
                <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                  {business.description}
                </p>
                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#002366] text-xs font-bold uppercase tracking-wider hover:underline"
                  >
                    Visit Website
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

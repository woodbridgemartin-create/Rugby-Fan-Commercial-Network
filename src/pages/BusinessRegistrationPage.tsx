import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Briefcase, MapPin, FileText, Target, Globe, Mail, User, ArrowRight } from 'lucide-react';

export default function BusinessRegistrationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Construction & Engineering',
    location: '',
    description: '',
    looking_for: '',
    investment_range: '',
    contact_name: '',
    email: '',
    website: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: err } = await supabase.from('businesses').insert([
        {
          name: formData.name,
          category: formData.category,
          location: formData.location,
          description: formData.description,
          looking_for: formData.looking_for,
          investment_range: formData.investment_range || null,
          contact_name: formData.contact_name || null,
          email: formData.email,
          website: formData.website || null,
        }
      ]);
      if (err) throw err;
      navigate('/businesses');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error publishing your profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 antialiased">
      <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="bg-[#002366] p-6 text-white">
          <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider block">Commercial Registry</span>
          <h1 className="text-xl font-black uppercase tracking-tight mt-0.5">Register Business Profile</h1>
        </div>

        {error && <div className="bg-red-50 p-3 border-b border-red-100 text-red-700 text-xs font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Company Name *</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input type="text" required placeholder="e.g. Apex Group Ltd" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#002366]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Industry Sector *</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-medium focus:outline-none">
                <option value="Construction & Engineering">Construction & Engineering</option>
                <option value="Financial Services & Accounting">Financial Services</option>
                <option value="Technology, Software & IT Support">Technology & Software</option>
                <option value="Hospitality, Catering & Event Management">Hospitality & Events</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Location / Coverage *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input type="text" required placeholder="e.g. Bristol & South West" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Company Description *</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <textarea required rows={3} placeholder="Briefly describe your business services..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Sponsorship Goals</label>
              <div className="relative">
                <Target className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="e.g. Local club kit asset exposure" value={formData.looking_for} onChange={(e) => setFormData({ ...formData, looking_for: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Budget Allocation (£)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">£</span>
                <input type="text" placeholder="e.g. 2,500" value={formData.investment_range} onChange={(e) => setFormData({ ...formData, investment_range: e.target.value })} className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h3 className="text-[10px] font-bold uppercase text-[#002366] tracking-wider">Internal Contact Routing</h3>
            
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Contact Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input type="text" required placeholder="e.g. Sarah Jenkins" value={formData.contact_name} onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Email (Internal Logging) *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input type="email" required placeholder="sponsorship@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Company Website Link</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input type="text" placeholder="www.company.com" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#002366] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#001a4d] transition-all disabled:bg-slate-300"
            >
              {loading ? 'Publishing...' : 'Publish Profile'} <ArrowRight size={12} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

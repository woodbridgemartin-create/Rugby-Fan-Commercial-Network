import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Shield, MapPin, Award, Globe, FileText, Target, ArrowRight, Share2, Image } from 'lucide-react';

export default function ClubRegistrationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    league: '',
    summary: '',
    infrastructure_needs: '',
    website: '',
    facebook_url: '',
    logo_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: err } = await supabase.from('clubs').insert([
        {
          name: formData.name,
          location: formData.location,
          league: formData.league || null,
          summary: formData.summary,
          infrastructure_needs: formData.infrastructure_needs,
          website: formData.website || null,
          facebook_url: formData.facebook_url || null,
          logo_url: formData.logo_url || null,
        }
      ]);
      if (err) throw err;
      navigate('/clubs');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error publishing registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 antialiased">
      <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="bg-[#002366] p-6 text-white">
          <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider block">Registry Asset Hub</span>
          <h1 className="text-xl font-black uppercase tracking-tight mt-0.5">Register Club Profile</h1>
        </div>

        {error && <div className="bg-red-50 p-3 border-b border-red-100 text-red-700 text-xs font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Club Name *</label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input type="text" required placeholder="e.g. Bath Old Boys RFC" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#002366]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Town / Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input type="text" required placeholder="e.g. Bath" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">League *</label>
              <div className="relative">
                <Award className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input type="text" required placeholder="e.g. Regional 1" value={formData.league} onChange={(e) => setFormData({ ...formData, league: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Club Overview & Matchday Footfall *</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <textarea required rows={3} placeholder="Describe team footfall, history, and active divisions..." value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Sponsorship Opportunities Available *</label>
            <div className="relative">
              <Target className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <textarea required rows={3} placeholder="e.g. Kit assets, perimeter training gear boards..." value={formData.infrastructure_needs} onChange={(e) => setFormData({ ...formData, infrastructure_needs: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Club Badge Image URL</label>
              <div className="relative">
                <Image className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="https://domain.com/badge.png" value={formData.logo_url} onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Facebook Page URL</label>
              <div className="relative">
                <Share2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="facebook.com/clubname" value={formData.facebook_url} onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Official Club Website URL *</label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input type="text" required placeholder="www.club.com" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#002366] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#001a4d] transition-all disabled:bg-slate-300"
            >
              {loading ? 'Submitting...' : 'Publish Profile'} <ArrowRight size={12} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

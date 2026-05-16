import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ClubRegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    league: '',
    location: '',
    description: '',
    website: '',
    email: '',
    contact_name: '',
    logo_url: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('clubs').insert([formData]);
      if (!error) navigate('/directory');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-slate-200 rounded-xl my-10 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight mb-2">Register Rugby Club (Free)</h1>
      <p className="text-xs text-slate-500 mb-6">List your club assets so local commercial businesses can discover your partnership opportunities.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Club Name *</label>
          <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:outline-none focus:border-[#002366]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">League / Division *</label>
            <input type="text" required value={formData.league} onChange={e => setFormData({...formData, league: e.target.value})} className="w-full p-2 border border-slate-200 rounded placeholder:text-slate-300" placeholder="e.g. Regional 1 South West" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Ground Location / Town *</label>
            <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-2 border border-slate-200 rounded" />
          </div>
        </div>
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Club Logo Image URL</label>
          <input type="url" value={formData.logo_url} onChange={e => setFormData({...formData, logo_url: e.target.value})} className="w-full p-2 border border-slate-200 rounded placeholder:text-slate-300" placeholder="https://example.com/club-badge.png" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Club Website</label>
            <input type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full p-2 border border-slate-200 rounded" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Primary Contact Name</label>
            <input type="text" value={formData.contact_name} onChange={e => setFormData({...formData, contact_name: e.target.value})} className="w-full p-2 border border-slate-200 rounded" />
          </div>
        </div>
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Contact Email Address *</label>
          <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border border-slate-200 rounded" />
        </div>
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Available Sponsorship Packages Overview</label>
          <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border border-slate-200 rounded placeholder:text-slate-300" placeholder="e.g. First XV Main Shirt Sponsor open, post pad configurations, match day program blocks..." />
        </div>
        <button type="submit" disabled={submitting} className="w-full py-3 bg-[#002366] text-white font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] disabled:opacity-50">
          {submitting ? 'Publishing Club...' : 'Register Club'}
        </button>
      </form>
    </div>
  );
}

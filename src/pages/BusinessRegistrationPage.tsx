import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function BusinessRegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Construction & Engineering',
    location: '',
    description: '',
    website: '',
    email: '',
    contact_name: '',
    investment_range: '',
    looking_for: '',
    logo_url: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('businesses').insert([formData]);
      if (!error) navigate('/directory');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-slate-200 rounded-xl my-10 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight mb-2">Register Business Partner</h1>
      <p className="text-xs text-slate-500 mb-6">Join the commercial rugby network loop and expose your brand availability to local clubs.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Company Name *</label>
          <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:outline-none focus:border-[#002366]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Industry Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border border-slate-200 rounded bg-white">
              <option value="Construction & Engineering">Construction & Engineering</option>
              <option value="Financial Services & Accounting">Financial Services & Accounting</option>
              <option value="Technology, Software & IT Support">Technology, Software & IT Support</option>
              <option value="Hospitality, Catering & Event Management">Hospitality, Catering & Event Management</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Location / Region *</label>
            <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-2 border border-slate-200 rounded placeholder:text-slate-300" placeholder="e.g. South West / Bristol" />
          </div>
        </div>
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Logo Image URL</label>
          <input type="url" value={formData.logo_url} onChange={e => setFormData({...formData, logo_url: e.target.value})} className="w-full p-2 border border-slate-200 rounded placeholder:text-slate-300" placeholder="https://example.com/logo.png" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Website URL</label>
            <input type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full p-2 border border-slate-200 rounded" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Contact Name</label>
            <input type="text" value={formData.contact_name} onChange={e => setFormData({...formData, contact_name: e.target.value})} className="w-full p-2 border border-slate-200 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Contact Email *</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border border-slate-200 rounded" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Annual Budget Target</label>
            <input type="text" value={formData.investment_range} onChange={e => setFormData({...formData, investment_range: e.target.value})} className="w-full p-2 border border-slate-200 rounded placeholder:text-slate-300" placeholder="e.g. £500 - £2,500" />
          </div>
        </div>
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Profile Overview</label>
          <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border border-slate-200 rounded" />
        </div>
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Sponsorship Preferences / Targeted Assets</label>
          <textarea rows={2} value={formData.looking_for} onChange={e => setFormData({...formData, looking_for: e.target.value})} className="w-full p-2 border border-slate-200 rounded placeholder:text-slate-300" placeholder="e.g. Looking for Front-of-Shirt placement or matchday hospitality access" />
        </div>
        <button type="submit" disabled={submitting} className="w-full py-3 bg-[#002366] text-white font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] disabled:opacity-50">
          {submitting ? 'Saving Profile...' : 'Submit Partnership Registration'}
        </button>
      </form>
    </div>
  );
}

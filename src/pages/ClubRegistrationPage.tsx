import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
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
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `club-${Date.now()}.${fileExt}`;
      const filePath = `club-logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('logos').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, logo_url: data.publicUrl }));
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Logo upload failed. Please ensure your Supabase storage bucket named "logos" exists and has a public policy enabled.');
    } finally {
      setUploading(false);
    }
  };

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

        {/* Club Logo File Drop/Upload Component */}
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Club Crest / Badge Logo</label>
          <div className="border border-dashed border-slate-200 bg-slate-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            {formData.logo_url ? (
              <div className="space-y-2">
                <img src={formData.logo_url} alt="Uploaded crest" className="h-16 w-auto object-contain mx-auto border bg-white p-1 rounded" />
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Crest Uploaded Successfully</p>
                <label className="cursor-pointer text-[#002366] font-semibold underline text-[10px] block">Change Badge
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            ) : (
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-2">
                <Upload size={20} className="text-slate-400 mb-1" />
                <span className="font-bold text-slate-700 block">{uploading ? 'Processing File...' : 'Choose Badge File'}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Supports PNG, JPG, JPEG up to 2MB</span>
                <input type="file" accept="image/*" disabled={uploading} onChange={handleFileUpload} className="hidden" />
              </label>
            )}
          </div>
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
        <button type="submit" disabled={submitting || uploading} className="w-full py-3 bg-[#002366] text-white font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] disabled:opacity-50">
          {submitting ? 'Publishing Club...' : 'Register Club'}
        </button>
      </form>
    </div>
  );
}

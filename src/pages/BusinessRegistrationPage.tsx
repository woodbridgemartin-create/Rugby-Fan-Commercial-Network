import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Briefcase, MapPin, Globe, Mail, FileText, Target, DollarSign, ArrowRight, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

const MAJOR_INDUSTRIES = [
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
  'Recruitment & Human Resources',
  'Other (Specify below)'
];

export default function BusinessRegistrationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    customCategory: '',
    location: '',
    description: '',
    looking_for: '',
    investment_range: '',
    website: '',
    email: '',
    logo_url: ''
  });

  // Handle Logo Uploading directly to Supabase Storage Bucket
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      if (!e.target.files || e.target.files.length === 0) return;
      
      setUploadingImage(true);
      const file = e.target.files[0];
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
      const filePath = `profile-logos/${uniqueFileName}`;

      // Upload file raw binary to the 'logos' bucket
      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      // Grab the permanent asset public CDN link
      const { data: publicUrlData } = supabase.storage
        .from('logos')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, logo_url: publicUrlData.publicUrl }));
    } catch (err: any) {
      console.error('File storage upload error:', err);
      setError(err.message || 'Image upload failed. Check bucket settings.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const finalCategory = formData.category === 'Other (Specify below)' 
      ? formData.customCategory 
      : formData.category;

    try {
      const { error: submitError } = await supabase.from('businesses').insert([
        {
          name: formData.name,
          category: finalCategory,
          location: formData.location,
          description: formData.description,
          looking_for: formData.looking_for,
          investment_range: formData.investment_range || null, // Matches the new column field cleanly
          website: formData.website || null,
          email: formData.email || null,
          logo_url: formData.logo_url || null,
        }
      ]);

      if (submitError) throw submitError;
      navigate('/business-network');
    } catch (err: any) {
      console.error('Error creating business profile:', err);
      setError(err.message || 'Failed to register profile. Please verify your fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="bg-[#002366] p-8 text-white">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">Commercial Network</span>
          <h1 className="text-2xl font-black uppercase tracking-tight">Create Corporate Profile</h1>
          <p className="text-slate-300 text-xs mt-1">Fill out your company credentials to sync directly with the active clubs network.</p>
        </div>

        {error && (
          <div className="bg-red-50 border-b border-red-200 p-4 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002366] border-b border-slate-100 pb-2">1. Company Identity</h3>
            
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Company Name *</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Commercial Supplies Ltd"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Business Sector / Industry *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
              >
                <option value="">Select your structural sector...</option>
                {MAJOR_INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {formData.category === 'Other (Specify below)' && (
              <div className="pt-1">
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Type Custom Industry Sector *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bespoke Stadium Turf Engineering"
                  value={formData.customCategory}
                  onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Location / Base City *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. London, United Kingdom"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Interactive Logo Image File Uploader Block */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002366] border-b border-slate-100 pb-2">2. Branding Assets</h3>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Company Logo Image</label>
              <div className="flex items-center gap-5 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {formData.logo_url ? (
                    <img src={formData.logo_url} alt="Uploaded logo preview" className="w-full h-full object-contain p-1" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-slate-300" />
                  )}
                </div>
                <div className="space-y-1">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 uppercase tracking-wider hover:bg-slate-100 cursor-pointer shadow-sm transition-colors">
                    {uploadingImage ? (
                      <>
                        <Loader2 size={12} className="animate-spin text-[#002366]" />
                        Uploading Asset...
                      </>
                    ) : (
                      <>
                        <Upload size={12} className="text-[#002366]" />
                        Upload Logo File
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleLogoUpload} 
                      disabled={uploadingImage} 
                    />
                  </label>
                  <p className="text-[10px] text-slate-400">Accepts PNG, JPG, SVG up to 5MB. Uploaded straight to storage.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002366] border-b border-slate-100 pb-2">3. Profile Content & Targets</h3>
            
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Corporate Summary / About Us *</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your company services, scale, and background history..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Sponsorship Strategy / What We Look For *</label>
              <div className="relative">
                <Target className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. We are looking for community clubs seeking kit deals or main shirt advertisement opportunities..."
                  value={formData.looking_for}
                  onChange={(e) => setFormData({ ...formData, looking_for: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Target Investment / Budget Range</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. £1,000 - £5,000 / Flexible allocations"
                  value={formData.investment_range}
                  onChange={(e) => setFormData({ ...formData, investment_range: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002366] border-b border-slate-100 pb-2">4. Direct Communication Channels</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Public Corporate Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="sponsorship@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="www.company.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#002366] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#001a4d] transition-all disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Publishing Profile Records...' : 'Publish Profile & Activate'}
              <ArrowRight size={14} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

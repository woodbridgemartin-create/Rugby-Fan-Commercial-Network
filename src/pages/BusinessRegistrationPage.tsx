import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, HelpCircle, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function BusinessRegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Construction & Engineering',
    custom_category: '',
    location: '',
    description: '',
    website: '',
    email: '',
    contact_name: '',
    investment_range: '',
    looking_for: '',
    logo_url: ''
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paymentRequired, setPaymentRequired] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `biz-${Date.now()}.${fileExt}`;
      const filePath = `business-logos/${fileName}`;

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
    
    const finalizedCategory = formData.category === 'Other' ? formData.custom_category : formData.category;
    
    let formattedWebsite = formData.website.trim();
    if (formattedWebsite && !/^https?:\/\//i.test(formattedWebsite)) {
      formattedWebsite = `https://${formattedWebsite}`;
    }

    const submissionPayload = {
      name: formData.name,
      category: finalizedCategory,
      location: formData.location,
      description: formData.description,
      website: formattedWebsite,
      email: formData.email,
      contact_name: formData.contact_name,
      investment_range: formData.investment_range,
      looking_for: formData.looking_for,
      logo_url: formData.logo_url,
      approved: false
    };

    try {
      const { error } = await supabase.from('businesses').insert([submissionPayload]);
      if (!error) {
        window.open('https://buy.stripe.com/9B63cu23385v6Ko6sD6AM04', '_blank');
        setPaymentRequired(true);
      } else {
        throw error;
      }
    } catch (err) {
      console.error(err);
      alert('Database registration failed. Please review your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (paymentRequired) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white border border-slate-200 rounded-xl my-20 shadow-lg text-center text-xs antialiased">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-100">
          <CreditCard size={28} />
        </div>
        
        <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-3">Payment Required</h1>
        
        <p className="text-slate-500 leading-relaxed mb-6">
          Your profile setup for <strong className="text-slate-800">{formData.name}</strong> has been saved securely, but will remain hidden from the directory loop until network dues are processed.
        </p>

        <div className="space-y-3">
          <a 
            href="https://buy.stripe.com/9B63cu23385v6Ko6sD6AM04"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-[#002366] text-white font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors shadow-sm"
          >
            Launch Secure Payment Tab (£79)
          </a>
          
          <button 
            onClick={() => navigate('/clubs')}
            className="block w-full py-3 bg-slate-100 text-slate-600 font-bold uppercase tracking-wider rounded hover:bg-slate-200 transition-colors"
          >
            Browse Public Listings
          </button>
        </div>

        <p className="text-[10px] text-slate-400 mt-6 leading-normal">
          Once your transaction confirmation clears our system backend parameters, your business listings transition live dynamically within 24 business hours.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-slate-200 rounded-xl my-10 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight mb-2">Register Business Partner</h1>
      <p className="text-xs text-slate-500 mb-6">Join the commercial rugby network loop and showcase your brand availability to local clubs.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Company Name *</label>
          <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-slate-200 rounded focus:outline-none focus:border-[#002366]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Industry Sector</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border border-slate-200 rounded bg-white">
              <option value="Construction & Engineering">Construction & Engineering</option>
              <option value="Financial Services & Accounting">Financial Services & Accounting</option>
              <option value="Technology, Software & IT Support">Technology, Software & IT Support</option>
              <option value="Hospitality, Catering & Event Management">Hospitality, Catering & Events</option>
              <option value="Legal & Corporate Advisory">Legal & Corporate Advisory</option>
              <option value="Marketing, Print & Creative Media">Marketing, Print & Creative Media</option>
              <option value="Retail, Apparel & Merchandise">Retail, Apparel & Merchandise</option>
              <option value="Logistics, Transport & Supply Chain">Logistics, Transport & Supply Chain</option>
              <option value="Medical, Health & Physiotherapy">Medical, Health & Physiotherapy</option>
              <option value="Other">Other (Type Custom Category Below)</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Location / Region *</label>
            <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-2 border border-slate-200 rounded placeholder:text-slate-300" placeholder="e.g. South West / Bristol" />
          </div>
        </div>

        {formData.category === 'Other' && (
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Specify Custom Industry Category *</label>
            <input type="text" required value={formData.custom_category} onChange={e => setFormData({...formData, custom_category: e.target.value})} className="w-full p-2 border border-rose-300 bg-rose-50/20 rounded focus:outline-none placeholder:text-slate-400" placeholder="e.g. Renewable Energy Setup" />
          </div>
        )}

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Company Logo</label>
          <div className="border border-dashed border-slate-200 bg-slate-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            {formData.logo_url ? (
              <div className="space-y-2">
                <img src={formData.logo_url} alt="Uploaded logo" className="h-16 w-auto object-contain mx-auto border bg-white p-1 rounded" />
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Logo Uploaded Successfully</p>
                <label className="cursor-pointer text-[#002366] font-semibold underline text-[10px] block">Change Image
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            ) : (
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-2">
                <Upload size={20} className="text-slate-400 mb-1" />
                <span className="font-bold text-slate-700 block">{uploading ? 'Processing File...' : 'Choose Logo File'}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Supports PNG, JPG, JPEG, WEBP up to 2MB</span>
                <input type="file" accept="image/*" disabled={uploading} onChange={handleFileUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wide mb-1">Website URL</label>
            <input type="text" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full p-2 border border-slate-200 rounded placeholder:text-slate-300" placeholder="example.com" />
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
            <div className="flex items-center gap-1 mb-1">
              <label className="block font-bold text-slate-700 uppercase tracking-wide">Sponsorship Budget Limit</label>
              <div className="group relative cursor-help">
                <HelpCircle size={12} className="text-slate-400" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-900 text-white text-[9px] p-2 rounded whitespace-nowrap z-50">
                  Gives clubs clarity on what level of sponsorship assets you can support.
                </div>
              </div>
            </div>
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
        
        <button type="submit" disabled={submitting || uploading} className="w-full py-3 bg-[#002366] text-white font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] disabled:opacity-50">
          {submitting ? 'Saving Profile...' : 'Submit Partnership Registration'}
        </button>
      </form>
    </div>
  );
}

-import { useState, useRef, type FormEvent, type DragEvent } from 'react';
import { ArrowLeft, Upload, CheckCircle, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { businessCategories, sanitizeUrl } from '../lib/categories';

export default function BusinessRegistrationPage() {
  const [form, setForm] = useState({
    name: '',
    category: businessCategories[0],
    customCategory: '',
    description: '',
    website: '',
    contactName: '',
    contactEmail: '',
    phone: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    let logoUrl: string | null = null;
    if (logoFile) {
      const ext = logoFile.name.split('.').pop() || 'png';
      const path = `business-logos/${Date.now()}.${ext}`;
      
      // Uploading to your public 'logos' storage bucket
      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(path, logoFile, { upsert: true });
        
      if (!uploadError) {
        const { data } = supabase.storage.from('logos').getPublicUrl(path);
        logoUrl = data.publicUrl;
      } else {
        console.error('Storage Upload Error:', uploadError);
      }
    }

    const category = form.category === 'Other / Custom Segment' ? form.customCategory : form.category;
    const website = sanitizeUrl(form.website);

    // Map fields explicitly to align perfectly with your updated database schema
    const { error } = await supabase.from('businesses').insert({
      name: form.name,
      category: category || form.category,
      description: form.description,
      website: website || null,
      logo_url: logoUrl,                  // Fixed column mapping from 'logo' to 'logo_url'
      contact_name: form.contactName,     // Saved user's input safely
      contact_email: form.contactEmail,   // Saved user's input safely
      phone: form.phone,                  // Saved public contact number
      membership_tier: 'premium',
    });

    if (error) { 
      console.error('Database Insertion Error:', error);
      setStatus('error'); 
      return; 
    }
    
    setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className="py-24 lg:py-32">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto rounded bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Registration Complete</h1>
          <p className="text-slate-500 mb-8">
            Your business has been registered as a Premium Commercial Partner. We'll review your listing and be in touch shortly.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 text-[#002366] font-bold text-sm uppercase tracking-wider hover:underline">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 lg:py-24 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#002366] transition-colors mb-6">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-3">Business Registration</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Join the Network</h1>
        </div>

        {status === 'error' && (
          <div className="px-4 py-3 mb-6 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            Something went wrong. Please try again.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Content Area */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-8 lg:p-10 space-y-6">
              
              {/* Logo Upload Zone */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Company Logo</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                    dragOver ? 'border-[#002366] bg-[#002366]/5' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {logoPreview ? (
                    <div className="flex flex-col items-center gap-3">
                      <img src={logoPreview} alt="Logo preview" className="w-16 h-16 object-contain" />
                      <p className="text-xs text-slate-400">Click or drag to replace</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload size={24} className="text-slate-300" />
                      <p className="text-sm text-slate-500">Drag and drop your logo here</p>
                      <p className="text-xs text-slate-400">or click to browse</p>
                    </div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${logoFile ? 'text-green-600' : 'text-slate-300'}`}>
                    {logoFile ? `${logoFile.name} (${(logoFile.size / 1024).toFixed(0)}KB)` : 'No file selected'}
                  </span>
                  <span className="text-[10px] text-slate-300">PNG, SVG, JPG — Max 5MB</span>
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Business Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" placeholder="e.g. Rugby Solutions Ltd" />
              </div>

              {/* Industry Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Industry Sector *</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all cursor-pointer">
                  {businessCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Custom Industry Input Block */}
              {form.category === 'Other / Custom Segment' && (
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Custom Industry Segment *</label>
                  <input type="text" required value={form.customCategory} onChange={(e) => setForm({ ...form, customCategory: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" placeholder="e.g. Sports Nutrition" />
                </div>
              )}

              {/* Description textarea */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Description</label>
                <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all resize-none" placeholder="Tell clubs what you do and how you can help..." />
              </div>

              {/* Website URL Input */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Website</label>
                <input type="text" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" placeholder="mycompany.com" />
                <p className="text-[10px] text-slate-400 mt-1">https:// will be added automatically if omitted</p>
              </div>

              {/* Public Phone Vector */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Public Contact Phone Number</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" placeholder="e.g. 01234 567890" />
              </div>

              {/* Account Profile Admin Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Contact Name *</label>
                  <input type="text" required value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" placeholder="e.g. Jane Smith" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Contact Email *</label>
                  <input type="email" required value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" placeholder="e.g. jane@company.com" />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-[#002366] text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors duration-200 disabled:opacity-50"
              >
                {status === 'submitting' ? 'Registering...' : 'Complete Registration'}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-lg p-8 sticky top-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#002366] mb-6">Order Summary</p>

              <div className="border border-slate-200 rounded-lg p-6 mb-6">
                <h3 className="text-base font-bold text-slate-900 mb-1">Premium Commercial Partner Pass</h3>
                <p className="text-sm text-slate-500 mb-4">Annual directory listing with full network access</p>
                <div className="text-3xl font-bold text-slate-900">
                  £79<span className="text-sm font-normal text-slate-400">/year</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Premium directory listing',
                  'Priority search placement',
                  'Direct club introductions',
                  'Sponsorship matching',
                  'Supports grassroots rugby',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#002366] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Stripe Dynamic Portal Box */}
              <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard size={18} className="text-slate-400" />
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Secure Payment Processing Gateway</p>
                </div>
                <div className="bg-white border border-slate-200 rounded p-4">
                  <code className="text-xs text-slate-400 font-mono block">
                    Payment integration will appear here.
                  </code>
                </div>
                <p className="text-[10px] text-slate-400 mt-3">
                  Payment processing via Stripe. Your data is encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

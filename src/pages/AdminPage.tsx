import { useState, useEffect, useRef, type FormEvent, type DragEvent } from 'react';
import { Lock, LogIn, CircleAlert as AlertCircle, Plus, Building2, Users, X, CircleCheck as CheckCircle, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { businessCategories, sanitizeUrl } from '../lib/categories';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  logo: string | null;
  membership_tier: string;
}

interface Club {
  id: string;
  name: string;
  location: string;
  contact: string;
  logo: string | null;
}

export default function AdminPage() {
  const [session, setSession] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'businesses' | 'clubs'>('businesses');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'business' | 'club'>('business');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [bizForm, setBizForm] = useState({
    name: '', category: businessCategories[0], customCategory: '', description: '', website: '', membership_tier: 'premium',
  });
  const [clubForm, setClubForm] = useState({
    name: '', location: '', contact: '',
  });

  const [bizLogoFile, setBizLogoFile] = useState<File | null>(null);
  const [bizLogoPreview, setBizLogoPreview] = useState<string | null>(null);
  const [bizDragOver, setBizDragOver] = useState(false);
  const [clubBadgeFile, setClubBadgeFile] = useState<File | null>(null);
  const [clubBadgePreview, setClubBadgePreview] = useState<string | null>(null);
  const [clubDragOver, setClubDragOver] = useState(false);
  const bizLogoRef = useRef<HTMLInputElement>(null);
  const clubBadgeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(!!s);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchListings();
  }, [session]);

  async function fetchListings() {
    const [bizRes, clubRes] = await Promise.all([
      supabase.from('businesses').select('*').order('created_at', { ascending: false }),
      supabase.from('clubs').select('*').order('created_at', { ascending: false }),
    ]);
    if (bizRes.data) setBusinesses(bizRes.data as Business[]);
    if (clubRes.data) setClubs(clubRes.data as Club[]);
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      setLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(false);
  }

  function handleBizLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setBizLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBizLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleClubBadgeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setClubBadgeFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setClubBadgePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleBizDrop(e: DragEvent) {
    e.preventDefault();
    setBizDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setBizLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBizLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleClubDrop(e: DragEvent) {
    e.preventDefault();
    setClubDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setClubBadgeFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setClubBadgePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async function uploadFile(file: File, folder: string): Promise<string | null> {
    const ext = file.name.split('.').pop() || 'png';
    const path = `${folder}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('logos').upload(path, file, { upsert: true });
    if (error) return null;
    const { data } = supabase.storage.from('logos').getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleCreateBusiness(e: FormEvent) {
    e.preventDefault();
    setFormStatus('submitting');

    let logoUrl: string | null = null;
    if (bizLogoFile) {
      const url = await uploadFile(bizLogoFile, 'business-logos');
      if (url) logoUrl = url;
    }

    const category = bizForm.category === 'Other / Custom Segment' ? bizForm.customCategory : bizForm.category;
    const website = sanitizeUrl(bizForm.website);

    const { error } = await supabase.from('businesses').insert({
      name: bizForm.name,
      category: category || bizForm.category,
      description: bizForm.description,
      website: website || null,
      logo: logoUrl,
      membership_tier: bizForm.membership_tier,
    });
    if (error) { setFormStatus('error'); return; }
    setFormStatus('success');
    setBizForm({ name: '', category: businessCategories[0], customCategory: '', description: '', website: '', membership_tier: 'premium' });
    setBizLogoFile(null);
    setBizLogoPreview(null);
    setShowForm(false);
    fetchListings();
    setTimeout(() => setFormStatus('idle'), 3000);
  }

  async function handleCreateClub(e: FormEvent) {
    e.preventDefault();
    setFormStatus('submitting');

    let logoUrl: string | null = null;
    if (clubBadgeFile) {
      logoUrl = await uploadFile(clubBadgeFile, 'club-badges');
    }

    const { error } = await supabase.from('clubs').insert({
      name: clubForm.name,
      location: clubForm.location,
      contact: clubForm.contact,
      logo: logoUrl,
    });
    if (error) { setFormStatus('error'); return; }
    setFormStatus('success');
    setClubForm({ name: '', location: '', contact: '' });
    setClubBadgeFile(null);
    setClubBadgePreview(null);
    setShowForm(false);
    fetchListings();
    setTimeout(() => setFormStatus('idle'), 3000);
  }

  async function handleDeleteBusiness(id: string) {
    await supabase.from('businesses').delete().eq('id', id);
    fetchListings();
  }

  async function handleDeleteClub(id: string) {
    await supabase.from('clubs').delete().eq('id', id);
    fetchListings();
  }

  function openForm(type: 'business' | 'club') {
    setFormType(type);
    setShowForm(true);
    setFormStatus('idle');
    setBizLogoFile(null);
    setBizLogoPreview(null);
    setClubBadgeFile(null);
    setClubBadgePreview(null);
  }

  const uploadZone = (
    file: File | null,
    preview: string | null,
    dragOver: boolean,
    onDrop: (e: DragEvent) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    ref: React.RefObject<HTMLInputElement | null>,
    label: string,
  ) => (
    <div>
      <label className="block text-sm font-bold text-slate-900 mb-2">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={onDrop}
        onClick={() => ref.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
          dragOver ? 'border-[#002366] bg-[#002366]/5' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        {preview ? (
          <div className="flex items-center justify-center gap-3">
            <img src={preview} alt="Preview" className="w-10 h-10 object-contain rounded" />
            <p className="text-xs text-slate-400">Click or drag to replace</p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Upload size={16} className="text-slate-300" />
            <p className="text-sm text-slate-400">Drag & drop or click</p>
          </div>
        )}
        <input ref={ref} type="file" accept="image/*" onChange={onChange} className="hidden" />
      </div>
      <div className="flex items-center gap-4 mt-1.5">
        <span className={`text-[10px] font-bold uppercase tracking-wider ${file ? 'text-green-600' : 'text-slate-300'}`}>
          {file ? `${file.name} (${(file.size / 1024).toFixed(0)}KB)` : 'No file selected'}
        </span>
        <span className="text-[10px] text-slate-300">PNG, SVG, JPG — Max 5MB</span>
      </div>
    </div>
  );

  if (session === null) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16">
        <div className="w-full max-w-md px-6">
          <div className="bg-white border border-slate-200 rounded-lg p-10">
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto rounded bg-[#002366]/10 flex items-center justify-center mb-4">
                <Lock size={24} className="text-[#002366]" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
              <p className="text-slate-500 text-sm mt-2">Sign in to manage Rugby Fan</p>
            </div>

            {authError && (
              <div className="flex items-center gap-2 px-4 py-3 mb-6 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                <AlertCircle size={16} className="shrink-0" />
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" />
              </div>
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#002366] text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors duration-200 disabled:opacity-50">
                {loading ? 'Signing in...' : 'Sign In'}
                <LogIn size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage businesses and clubs in the directory</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded hover:bg-white transition-colors">
            Sign Out
          </button>
        </div>

        {formStatus === 'success' && (
          <div className="flex items-center gap-2 px-4 py-3 mb-6 bg-green-50 border border-green-200 rounded text-sm text-green-700">
            <CheckCircle size={16} className="shrink-0" />
            Listing created successfully.
          </div>
        )}
        {formStatus === 'error' && (
          <div className="flex items-center gap-2 px-4 py-3 mb-6 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            <AlertCircle size={16} className="shrink-0" />
            Something went wrong. Please try again.
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <button onClick={() => openForm('business')} className="inline-flex items-center gap-2 px-5 py-3 bg-[#002366] text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors">
            <Plus size={16} />
            Create Business Listing
          </button>
          <button onClick={() => openForm('club')} className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 text-[#002366] text-sm font-bold uppercase tracking-wider rounded hover:bg-white transition-colors">
            <Plus size={16} />
            Create Club Listing
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white border border-slate-200 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">
                  {formType === 'business' ? 'New Business Listing' : 'New Club Listing'}
                </h2>
                <button onClick={() => setShowForm(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {formType === 'business' ? (
                  <form onSubmit={handleCreateBusiness} className="space-y-5">
                    {uploadZone(bizLogoFile, bizLogoPreview, bizDragOver, handleBizDrop, handleBizLogoChange, bizLogoRef, 'Company Logo')}

                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-1">Business Name *</label>
                      <input type="text" required value={bizForm.name} onChange={(e) => setBizForm({ ...bizForm, name: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-1">Category *</label>
                      <select value={bizForm.category} onChange={(e) => setBizForm({ ...bizForm, category: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]">
                        {businessCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    {bizForm.category === 'Other / Custom Segment' && (
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-1">Custom Industry Segment *</label>
                        <input type="text" required value={bizForm.customCategory} onChange={(e) => setBizForm({ ...bizForm, customCategory: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]" placeholder="e.g. Sports Nutrition" />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-1">Description</label>
                      <textarea rows={3} value={bizForm.description} onChange={(e) => setBizForm({ ...bizForm, description: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-1">Website</label>
                      <input type="text" value={bizForm.website} onChange={(e) => setBizForm({ ...bizForm, website: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]" placeholder="mycompany.com" />
                      <p className="text-[10px] text-slate-400 mt-1">https:// will be added automatically if omitted</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-1">Membership Tier *</label>
                      <select value={bizForm.membership_tier} onChange={(e) => setBizForm({ ...bizForm, membership_tier: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]">
                        <option value="premium">Premium Commercial Partner</option>
                        <option value="standard">Standard</option>
                      </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="submit" disabled={formStatus === 'submitting'} className="flex-1 py-3 bg-[#002366] text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors disabled:opacity-50">
                        {formStatus === 'submitting' ? 'Creating...' : 'Publish Business'}
                      </button>
                      <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-slate-200 text-slate-600 font-medium text-sm rounded hover:bg-slate-50 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleCreateClub} className="space-y-5">
                    {uploadZone(clubBadgeFile, clubBadgePreview, clubDragOver, handleClubDrop, handleClubBadgeChange, clubBadgeRef, 'Club Badge / Crest')}

                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-1">Club Name *</label>
                      <input type="text" required value={clubForm.name} onChange={(e) => setClubForm({ ...clubForm, name: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-1">Location *</label>
                      <input type="text" required value={clubForm.location} onChange={(e) => setClubForm({ ...clubForm, location: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-1">Contact Info *</label>
                      <input type="text" required value={clubForm.contact} onChange={(e) => setClubForm({ ...clubForm, contact: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366]" placeholder="Email or phone" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="submit" disabled={formStatus === 'submitting'} className="flex-1 py-3 bg-[#002366] text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors disabled:opacity-50">
                        {formStatus === 'submitting' ? 'Creating...' : 'Publish Club'}
                      </button>
                      <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-slate-200 text-slate-600 font-medium text-sm rounded hover:bg-slate-50 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-1 mb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('businesses')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'businesses' ? 'border-[#002366] text-[#002366]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Building2 size={16} />
            Businesses ({businesses.length})
          </button>
          <button
            onClick={() => setActiveTab('clubs')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === 'clubs' ? 'border-[#002366] text-[#002366]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Users size={16} />
            Clubs ({clubs.length})
          </button>
        </div>

        {activeTab === 'businesses' ? (
          businesses.length === 0 ? (
            <div className="text-center py-16">
              <Building2 size={40} className="text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400">No businesses yet. Create your first listing.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {businesses.map((biz) => (
                <div key={biz.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-[#002366]/10 flex items-center justify-center shrink-0 overflow-hidden">
                      {biz.logo ? <img src={biz.logo} alt="" className="w-6 h-6 object-contain" /> : <span className="text-[#002366] font-bold text-sm">{biz.name.charAt(0)}</span>}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{biz.name}</h3>
                      <p className="text-xs text-slate-400">{biz.category} &middot; {biz.membership_tier}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteBusiness(biz.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Remove</button>
                </div>
              ))}
            </div>
          )
        ) : clubs.length === 0 ? (
          <div className="text-center py-16">
            <Users size={40} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400">No clubs yet. Create your first listing.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {clubs.map((club) => (
              <div key={club.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-[#002366]/10 flex items-center justify-center shrink-0 overflow-hidden">
                    {club.logo ? <img src={club.logo} alt="" className="w-6 h-6 object-contain" /> : <span className="text-[#002366] font-bold text-sm">{club.name.charAt(0)}</span>}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{club.name}</h3>
                    <p className="text-xs text-slate-400">{club.location} &middot; {club.contact}</p>
                  </div>
                </div>
                <button onClick={() => handleDeleteClub(club.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

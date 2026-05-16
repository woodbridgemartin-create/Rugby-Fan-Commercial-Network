import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Shield, MapPin, Award, Globe, Mail, FileText, Target, ArrowRight, Facebook, Image } from 'lucide-react';

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
    main_contact_email: '',
    website: '',
    facebook_url: '',
    logo_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase.from('clubs').insert([
        {
          name: formData.name,
          location: formData.location,
          league: formData.league || null,
          summary: formData.summary,
          infrastructure_needs: formData.infrastructure_needs,
          main_contact_email: formData.main_contact_email,
          website: formData.website || null,
          facebook_url: formData.facebook_url || null,
          logo_url: formData.logo_url || null,
        }
      ]);

      if (submitError) throw submitError;
      navigate('/clubs');
    } catch (err: any) {
      console.error('Error creating club profile:', err);
      setError(err.message || 'Failed to register club profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="bg-[#002366] p-8 text-white">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">Club Network Registry</span>
          <h1 className="text-2xl font-black uppercase tracking-tight">Register Club Profile</h1>
          <p className="text-slate-300 text-xs mt-1">List your rugby club to connect directly with corporate sponsors and commercial partners.</p>
        </div>

        {error && (
          <div className="bg-red-50 border-b border-red-200 p-4 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Section 1: Core Identity */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002366] border-b border-slate-100 pb-2">1. Club Identity</h3>
            
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Club Name *</label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Cardiff Community RFC"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Location / Town *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cardiff"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">League / Division *</label>
                <div className="relative">
                  <Award className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Community League"
                    value={formData.league}
                    onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Commercial Details */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002366] border-b border-slate-100 pb-2">2. Commercial Pitch Details</h3>
            
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Club Overview & Community Summary *</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea
                  required
                  rows={3}
                  placeholder="Tell businesses about your history, active senior teams, mini/junior sections, and match-day footfall..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Target Commercial Requirements & Infrastructure Needs *</label>
              <div className="relative">
                <Target className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Seeking sponsors for main-kit asset branding, pitchside perimeter board placements, or youth section kit supply..."
                  value={formData.infrastructure_needs}
                  onChange={(e) => setFormData({ ...formData, infrastructure_needs: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Channels & Media Assets */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002366] border-b border-slate-100 pb-2">3. Media Channels & Media Assets</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Main Commercial Contact Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="commercial@yourclub.com"
                    value={formData.main_contact_email}
                    onChange={(e) => setFormData({ ...formData, main_contact_email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Club Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="www.yourclub.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Club Facebook Page URL</label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="facebook.com/yourclub"
                    value={formData.facebook_url}
                    onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Club Badge / Logo URL</label>
                <div className="relative">
                  <Image className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="https://example.com/badge.png"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#002366] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#001a4d] transition-all disabled:bg-slate-300 shadow-sm"
            >
              {loading ? 'Publishing Profile...' : 'Publish Club Profile'}
              <ArrowRight size={14} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

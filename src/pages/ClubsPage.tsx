import { useState } from 'react';
import { MapPin, Trophy, Globe, Facebook, Mail, User, ChevronDown, ChevronUp } from 'lucide-react';

interface Club {
  id: string;
  name: string;
  league: string;
  location: string;
  description: string | null;
  website: string | null;
  facebook_url: string | null;
  email: string | null;
  contact_name: string | null;
  logo_url: string | null;
}

export default function ClubProfileCard({ club }: { club: Club }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white border rounded-xl overflow-hidden transition-all ${isOpen ? 'border-[#002366] shadow' : 'border-slate-200 hover:border-slate-300'}`}>
      
      {/* Main Visible Banner Row */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-4">
          {club.logo_url && club.logo_url.trim() !== '' ? (
            <div className="w-12 h-12 rounded-lg border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0">
              <img src={club.logo_url} alt={`${club.name} badge`} className="w-full h-full object-contain p-1" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-slate-100 text-[#002366] border border-slate-200 rounded-lg flex items-center justify-center font-black text-lg shrink-0">
              {club.name.charAt(0).toUpperCase()}
            </div>
          )}
          
          <div>
            <h3 className="font-bold text-slate-900 text-base">{club.name}</h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1 font-medium">
              <span className="text-[#002366] font-bold uppercase text-[10px] tracking-wider">
                <Trophy size={11} className="inline mr-1" />{club.league}
              </span>
              <span>
                <MapPin size={11} className="inline mr-0.5" />{club.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#002366] text-xs font-bold uppercase tracking-wider self-end sm:self-center">
          <span>{isOpen ? 'Hide Profile' : 'View Profile'}</span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>

      {/* Expanded Details Panel */}
      {isOpen && (
        <div className="p-5 border-t border-slate-100 bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Copy Area */}
          <div className="md:col-span-2 space-y-4">
            
            {/* 1. Club Overview Field Mapping */}
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Sponsorship Packages & Info</h4>
              <div className="text-xs text-slate-700 leading-relaxed mt-1 bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-line">
                {club.description && club.description.trim() !== '' ? (
                  club.description
                ) : (
                  <span className="text-slate-400 italic">No descriptive asset overview filled out yet. Contact the club committee below for active packages.</span>
                )}
              </div>
            </div>

            {/* Contact Person Badge */}
            {club.contact_name && (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-lg w-fit shadow-sm">
                <User size={13} className="text-[#002366]" />
                <span>Club Representative: {club.contact_name}</span>
              </div>
            )}
          </div>

          {/* Side Panel: Links and Actions */}
          <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2.5 shadow-sm text-xs self-start">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Connect Directly</h4>
            
            {club.email && (
              <a href={`mailto:${club.email}`} className="flex items-center gap-2 w-full py-2 px-3 bg-[#002366] text-white rounded font-bold uppercase tracking-wider text-[10px] hover:bg-[#001a4d] transition-colors">
                <Mail size={12} /> Email Club Commercials
              </a>
            )}

            {club.website && (
              <a href={club.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 w-full py-2 px-3 bg-slate-100 text-slate-700 rounded font-semibold text-[10px] border border-slate-200 hover:bg-slate-200 transition-colors">
                <Globe size={12} className="text-slate-400" /> Visit Main Website
              </a>
            )}

            {club.facebook_url && (
              <a href={club.facebook_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 w-full py-2 px-3 bg-slate-100 text-slate-700 rounded font-semibold text-[10px] border border-slate-200 hover:bg-slate-200 transition-colors">
                <Facebook size={12} className="text-blue-600" /> Official Facebook Page
              </a>
            )}

            {!club.website && !club.facebook_url && (
              <span className="text-center block text-slate-400 text-[10px] italic py-1">No external links attached. Use email button above.</span>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

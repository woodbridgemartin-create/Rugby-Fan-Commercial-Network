import { Eye, Mail, ShieldAlert } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 antialiased">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Header Banner */}
        <div className="bg-[#002366] text-white p-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">Data Compliance</span>
            <h1 className="text-3xl font-black uppercase tracking-tight">Privacy Policy</h1>
            <p className="text-slate-300 text-xs mt-1">Last updated: May 2026</p>
          </div>
          <Eye size={48} className="text-amber-400 shrink-0 opacity-80 hidden sm:block" />
        </div>

        {/* Policy Body */}
        <div className="p-8 space-y-6 text-xs text-slate-600 leading-relaxed">
          
          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">1. Introduction</h2>
            <p>
              Leadsopedia Limited ("we", "us", or "our") operates the Rugby Fan platform. This Privacy Policy explains how we collect, use, and protect your personal information when you use our service.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">2. Information We Collect</h2>
            <p>To run the network directory accurately, we may collect the following data types:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-slate-500">
              <li><strong>Personal Identification Data:</strong> Name, contact email addresses, and phone numbers.</li>
              <li><strong>Directory Profiles:</strong> Club credentials, league placements, business descriptions, branding imagery, and trade sectors.</li>
              <li><strong>System Logs & Analytics:</strong> Performance indicators, usage data, and analytics mapping platform engagement.</li>
              <li><strong>Inbound Communications:</strong> Data exchanged via direct platform forms, support threads, or email inquiries.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">3. How We Use Your Information</h2>
            <p>We process collected profile information to achieve the following operations:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-slate-500">
              <li>Host, manage, maintain, and secure the public directory infrastructure.</li>
              <li>Process your business membership listings and commercial grant pipeline routes.</li>
              <li>Communicate essential updates regarding registration, security alerts, and account lifecycle notifications.</li>
              <li>Analyze behavioral data to continuously optimize the system framework.</li>
              <li>Comply with necessary regulatory updates and statutory parameters.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">4. Data Protection & Security</h2>
            <p>
              We adhere strictly to the <strong>UK GDPR</strong> and the <strong>Data Protection Act 2018</strong>. All user records, system payloads, and asset imagery are housed inside secure database structures. <strong>We will never sell your personal data or corporate directory credentials to third-party marketing brokers.</strong>
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">5. Your Legal Rights</h2>
            <p>Under UK data protection infrastructure, you maintain complete jurisdiction over your data:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-slate-500">
              <li>The right to access or export individual personal data payloads stored in our directory.</li>
              <li>The right to demand correction of out-of-date or inaccurate profile metrics.</li>
              <li>The right to demand complete deletion of your club or business account records.</li>
              <li>The right to restrict or object to automated background database analytical sorting.</li>
            </ul>
          </section>

          <hr className="border-slate-100 my-6" />

          {/* DPA Support Footer Area */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px]">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-slate-400 shrink-0" />
              <span className="text-slate-500 font-medium">Data Privacy Queries handled via <strong>Leadsopedia Limited</strong></span>
            </div>
            <a href="mailto:hello@rugbyfan.co.uk" className="inline-flex items-center gap-1.5 text-[#002366] font-bold uppercase tracking-wider hover:underline">
              <Mail size={14} /> hello@rugbyfan.co.uk
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

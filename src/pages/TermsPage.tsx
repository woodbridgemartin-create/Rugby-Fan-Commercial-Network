import { ShieldCheck, Mail, Building } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 antialiased">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Editorial Top Title Header */}
        <div className="bg-[#002366] text-white p-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">Legal Agreements</span>
            <h1 className="text-3xl font-black uppercase tracking-tight">Terms of Service</h1>
            <p className="text-slate-300 text-xs mt-1">Last updated: May 2026</p>
          </div>
          <ShieldCheck size={48} className="text-amber-400 shrink-0 opacity-80 hidden sm:block" />
        </div>

        {/* Legal Body Sections */}
        <div className="p-8 space-y-6 text-xs text-slate-600 leading-relaxed">
          
          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Rugby Fan platform, operated by Leadsopedia Limited, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">2. Description of Service</h2>
            <p>
              Rugby Fan is a commercial network connecting rugby clubs with businesses. We provide directory listings, networking tools, and related services for the UK rugby community.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">3. Membership & Fees</h2>
            <p>
              Club membership is free. Business membership is available on an annual basis. Founding Members receive a locked-in rate of <strong>£79/year</strong>. Standard pricing is £149/year. Membership fees are non-refundable except as required by law.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">4. User Responsibilities</h2>
            <p>All registered platform users agree to explicitly abide by the following standards:</p>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-slate-500">
              <li>Provide accurate, truthful, and up-to-date information for your directory listing.</li>
              <li>Not misuse the platform, build scraping protocols, or engage in fraudulent activity.</li>
              <li>Respect other users, their system data, and corporate identity profiles.</li>
              <li>Comply with all applicable laws and regional UK regulations.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">5. Intellectual Property</h2>
            <p>
              All content on the Rugby Fan platform, including system brand layouts, logos, designs, custom databases, and structural text, is the property of Leadsopedia Limited or its licensors. You may not reproduce, copy, or distribute our content without explicit written permission.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">6. Limitation of Liability</h2>
            <p>
              Rugby Fan is provided on an "as is" and "as available" basis without warranties of any kind. Leadsopedia Limited shall not be liable for any indirect, incidental, or consequential commercial damages arising from your use or inability to use the service.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your directory account immediately if you breach these terms. You may cancel your annual membership at any time, though subscription fees already processed are non-refundable.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wide">8. Governing Law</h2>
            <p>
              These terms are explicitly governed by and construed in accordance with the laws of England and Wales. Any disputes shall be resolved exclusively within the courts of England and Wales.
            </p>
          </section>

          <hr className="border-slate-100 my-6" />

          {/* Footer Contact Metadata */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px]">
            <div className="flex items-center gap-2">
              <Building size={16} className="text-slate-400 shrink-0" />
              <span className="text-slate-500 font-medium">Operated by <strong>Leadsopedia Limited</strong></span>
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

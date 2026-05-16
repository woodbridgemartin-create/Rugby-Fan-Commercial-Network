import { Link } from 'react-router-dom';
import { ArrowRight, Users, Building2, Search, Handshake, PoundSterling, ShieldCheck, Trophy, ArrowDown } from 'lucide-react';

const loopSteps = [
  {
    icon: PoundSterling,
    label: 'BUSINESS INVESTS',
    title: '£79 Premium Commercial Partner Pass',
    description: 'A business joins the network as a Premium Commercial Partner. Their annual subscription enters the commercial loop.',
  },
  {
    icon: ShieldCheck,
    label: 'GRASSROOTS FUND',
    title: 'Revenue Fuels Regional Grants',
    description: 'Subscription revenue is channelled into a regional grassroots fund — equipment, kit, and safety grants for clubs that need it most.',
  },
  {
    icon: Trophy,
    label: 'CLUBS THRIVE',
    title: 'Clubs Secure Vital Sponsorship',
    description: 'Clubs gain visibility, connect with sponsors, and secure the commercial partnerships they need to grow and compete.',
  },
  {
    icon: Handshake,
    label: 'LOOP CLOSES',
    title: 'Businesses Find Club Partners',
    description: 'The business that invested finds its ideal club partner through the network — completing a direct B2B partnership loop.',
  },
];

const howItWorks = [
  {
    icon: Search,
    title: 'Discover',
    description: 'Browse our curated directory of rugby-friendly businesses and clubs across the UK.',
  },
  {
    icon: Handshake,
    title: 'Connect',
    description: 'Build meaningful commercial relationships within the rugby community.',
  },
  {
    icon: Building2,
    title: 'Grow',
    description: 'Expand your network and unlock new commercial opportunities in rugby.',
  },
  {
    icon: Users,
    title: 'Thrive',
    description: 'Benefit from a thriving community of like-minded rugby professionals.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#002366]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              The UK's Commercial Rugby Network
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase leading-[1.05] mb-8 tracking-tight">
              Where Rugby Meets <span className="whitespace-nowrap">Commercial Opportunity</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-12 max-w-xl">
              The UK's dedicated network connecting clubs with sponsors and service providers. One platform. One community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/business-registration"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#002366] font-bold text-sm uppercase tracking-wider rounded hover:bg-gray-100 transition-colors duration-200"
              >
                List Your Business
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/club-registration"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-colors duration-200"
              >
                Register Your Club — Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grassroots Commercial Loop */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl mb-20">
            <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              The Grassroots Commercial Loop
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              How Your £79 Fuels the Game
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Every Premium Commercial Partner subscription creates a direct commercial loop — from business investment to grassroots impact to sponsorship partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 rounded-lg overflow-hidden">
            {loopSteps.map((step, i) => (
              <div key={step.label} className="bg-white p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-[#002366] flex items-center justify-center shrink-0">
                    <step.icon size={18} className="text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#002366]">
                    {step.label}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
                {i < loopSteps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-end mt-6">
                    <ArrowDown size={14} className="text-slate-300 rotate-[-90deg]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 border border-slate-200 rounded-lg p-6 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-8 h-8 rounded bg-[#002366]/10 flex items-center justify-center shrink-0 mt-0.5">
              <PoundSterling size={16} className="text-[#002366]" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mb-1">Your listing does more than grow your brand.</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Directory membership fees actively support grassroots rugby communities with sponsorship opportunities and equipment grants across the UK.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Sponsorship
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Sponsorship Opportunities
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Looking to sponsor a rugby club? Our network connects businesses with clubs actively seeking sponsorship at every level of the game.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Access clubs across the UK seeking sponsors',
                  'From grassroots to professional level',
                  'Direct introductions to club decision-makers',
                  'Transparent sponsorship opportunities',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#002366] mt-2 shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/directory"
                className="inline-flex items-center gap-2 text-[#002366] font-bold text-sm uppercase tracking-wider hover:underline"
              >
                Browse the Directory
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="border border-slate-200 rounded-lg p-10 bg-white">
              <div className="text-center">
                <Trophy size={36} className="text-[#002366] mx-auto mb-6" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Connect with Clubs
                </h3>
                <p className="text-slate-500 text-sm mb-8">
                  Find the perfect club to sponsor and make a lasting impact in the rugby community.
                </p>
                <Link
                  to="/business-registration"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#002366] text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors"
                >
                  Find Sponsorship
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl mb-20">
            <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              How It Works
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              A Smarter Way to Connect
            </h2>
            <p className="text-slate-500 text-lg">
              Rugby Fan brings the commercial rugby ecosystem together in one powerful network.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 rounded-lg overflow-hidden">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="bg-white p-8 lg:p-10">
                <div className="w-10 h-10 rounded bg-[#002366] flex items-center justify-center mb-6">
                  <step.icon size={18} className="text-white" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-300 mb-2">
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="bg-[#002366] rounded-lg p-12 lg:p-20 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 uppercase tracking-tight">
              Ready to Join the Network?
            </h2>
            <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
              Clubs join free. Businesses list as Premium Commercial Partners at £79/year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/club-registration"
                className="px-10 py-4 bg-white text-[#002366] font-bold text-sm uppercase tracking-wider rounded hover:bg-gray-100 transition-colors duration-200"
              >
                Register Your Club — Free
              </Link>
              <Link
                to="/business-registration"
                className="px-10 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-colors duration-200"
              >
                List Your Business
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

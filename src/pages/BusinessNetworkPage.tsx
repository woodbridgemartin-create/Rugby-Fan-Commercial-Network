import { Link } from 'react-router-dom';
import { Target, ChartBar as BarChart3, Globe, Handshake, ArrowRight, Trophy, PoundSterling } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: 'Targeted Audience',
    description: 'Reach the rugby community directly. Your products and services in front of the people who matter.',
  },
  {
    icon: BarChart3,
    title: 'Measurable Impact',
    description: 'Track engagement and ROI through our platform with transparent reporting.',
  },
  {
    icon: Globe,
    title: 'National Reach',
    description: 'Access clubs and fans across the entire UK rugby landscape from a single platform.',
  },
  {
    icon: Handshake,
    title: 'Partnership Opportunities',
    description: 'Discover sponsorship, advertising, and collaboration opportunities with rugby clubs.',
  },
];

export default function BusinessNetworkPage() {
  return (
    <div>
      <section className="bg-[#002366]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              For Businesses
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white uppercase leading-[1.1] mb-6 tracking-tight">
              Reach the Rugby Community
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-10">
              Connect your brand with rugby clubs, fans, and the wider community. A dedicated commercial network built for the sport.
            </p>
            <Link
              to="/business-registration"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#002366] font-bold text-sm uppercase tracking-wider rounded hover:bg-gray-100 transition-colors duration-200"
            >
              List Your Business
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Altruistic Callout */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="border border-slate-200 rounded-lg p-5 flex items-start gap-4">
            <div className="w-8 h-8 rounded bg-[#002366]/10 flex items-center justify-center shrink-0 mt-0.5">
              <PoundSterling size={16} className="text-[#002366]" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 mb-0.5">Your listing supports grassroots rugby.</p>
              <p className="text-sm text-slate-500">Every Premium Commercial Partner membership helps fund sponsorship opportunities and equipment grants for community clubs across the UK.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl mb-20">
            <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Why Join
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Benefits for Businesses
            </h2>
            <p className="text-slate-500 text-lg">
              Tap into a passionate, engaged community with real commercial intent.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 rounded-lg overflow-hidden">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white p-8 lg:p-10 flex gap-5">
                <div className="w-10 h-10 shrink-0 rounded bg-[#002366] flex items-center justify-center">
                  <b.icon size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
                </div>
              </div>
            ))}
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
                Find Clubs to Sponsor
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Our network helps businesses find rugby clubs to sponsor at every level of the game. From grassroots community clubs to professional sides, connect with clubs actively seeking commercial partners.
              </p>
              <ul className="space-y-4">
                {[
                  'Browse clubs across the UK seeking sponsorship',
                  'Connect directly with club decision-makers',
                  'Support the rugby community at any budget',
                  'Build lasting brand partnerships with clubs',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#002366] mt-2 shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-10 bg-white">
              <div className="text-center">
                <Trophy size={36} className="text-[#002366] mx-auto mb-6" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Sponsor a Club</h3>
                <p className="text-slate-500 text-sm mb-8">
                  Browse clubs across the UK actively seeking sponsorship and make your mark on the rugby community.
                </p>
                <Link
                  to="/directory"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#002366] text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors"
                >
                  Find a Club
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl mx-auto mb-16">
            <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Pricing
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Premium Commercial Partner
            </h2>
            <p className="text-slate-500 text-lg">
              A single, transparent price. No tiers, no gimmicks.
            </p>
          </div>
          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-lg p-10 text-center">
            <span className="inline-block px-3 py-1 bg-[#002366]/10 text-[#002366] text-[10px] font-bold uppercase tracking-[0.15em] rounded mb-6">
              Premium Commercial Partner
            </span>
            <div className="mb-8">
              <div className="text-5xl font-bold text-slate-900">
                £79<span className="text-lg font-normal text-slate-400">/year</span>
              </div>
            </div>
            <ul className="text-left space-y-3 mb-10">
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
            <Link
              to="/business-registration"
              className="block w-full py-4 bg-[#002366] text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

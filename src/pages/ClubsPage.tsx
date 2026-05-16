import { Link } from 'react-router-dom';
import { Users, Megaphone, TrendingUp, Shield, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: Megaphone,
    title: 'Attract Sponsors',
    description: 'Get visible to businesses actively looking to sponsor rugby clubs at every level.',
  },
  {
    icon: Users,
    title: 'Expand Your Network',
    description: 'Connect with a curated community of commercial partners and service providers.',
  },
  {
    icon: TrendingUp,
    title: 'Increase Revenue',
    description: 'Unlock new commercial opportunities and diversify your income streams.',
  },
  {
    icon: Shield,
    title: 'Trusted Partners',
    description: 'All businesses in our network are vetted, ensuring quality and reliability.',
  },
];

export default function ClubsPage() {
  return (
    <div>
      <section className="bg-[#002366]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              For Rugby Clubs
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white uppercase leading-[1.1] mb-6 tracking-tight">
              Unlock Commercial Potential for Your Club
            </h1>
            <p className="text-lg text-white/50 leading-relaxed mb-4">
              Join the network that connects your club with sponsors, partners, and commercial opportunities tailored to the rugby community.
            </p>
            <p className="text-white font-bold text-lg mb-10">
              Free for clubs. Forever.
            </p>
            <Link
              to="/club-registration"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#002366] font-bold text-sm uppercase tracking-wider rounded hover:bg-gray-100 transition-colors duration-200"
            >
              Register Your Club
              <ArrowRight size={16} />
            </Link>
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
              Benefits for Clubs
            </h2>
            <p className="text-slate-500 text-lg">
              Rugby Fan gives your club the commercial edge it deserves. And it won't cost you a penny.
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

      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              It's Free for Clubs
            </h2>
            <p className="text-slate-500 text-lg mb-10">
              Register your club today and start connecting with sponsors and commercial partners across the UK rugby community.
            </p>
            <Link
              to="/club-registration"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#002366] text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors duration-200"
            >
              Register Your Club
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

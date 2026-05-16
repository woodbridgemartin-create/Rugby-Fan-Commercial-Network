import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is Rugby Fan?',
    a: 'Rugby Fan is the UK\'s commercial rugby network. We connect rugby clubs with businesses, sponsors, and service providers to create meaningful commercial partnerships across the rugby community.',
  },
  {
    q: 'Is it free for clubs to join?',
    a: 'Yes! It is completely free for rugby clubs to join Rugby Fan. Clubs can register, create a profile, and connect with sponsors and businesses at no cost. This will always be the case.',
  },
  {
    q: 'How much does it cost for businesses?',
    a: 'Businesses can join as a Premium Commercial Partner for £79/year. This gives you a full directory listing, priority search placement, and access to the network with direct club introductions.',
  },
  {
    q: 'Who can join the network?',
    a: 'Any rugby club or business operating in or around the UK rugby community can join. Whether you\'re a grassroots club or a national brand, there\'s a place for you.',
  },
  {
    q: 'What is a Premium Commercial Partner?',
    a: 'Premium Commercial Partners are businesses that have joined the network at our flat rate of £79/year. They receive a premium directory listing, priority search placement, and direct club introductions.',
  },
  {
    q: 'How does the directory work?',
    a: 'Our directory is a searchable, categorised listing of businesses and clubs. You can filter by industry sector, search by name, and see membership tiers. It\'s designed to make finding the right partner quick and easy.',
  },
  {
    q: 'What does business membership include?',
    a: 'Business membership includes a full directory listing, access to the network, priority matching, and dedicated support. Your listing also supports grassroots rugby communities across the UK.',
  },
  {
    q: 'How do I get started?',
    a: 'Clubs can register for free using our Club Registration form. Businesses can list through our Business Registration page. We\'ll guide you through the onboarding process and get your listing live.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. We take data protection seriously and comply with UK GDPR. Your information is stored securely and only shared with your consent. See our Privacy Policy for full details.',
  },
  {
    q: 'Can I cancel my membership?',
    a: 'Yes, you can cancel at any time. Your membership will remain active until the end of your current billing period. No long-term contracts.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-20">
          <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-4">FAQ</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500 text-lg">Everything you need to know about Rugby Fan.</p>
        </div>

        <div className="space-y-px bg-slate-200 rounded-lg overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors duration-150"
              >
                <span className="text-sm font-bold text-slate-900 pr-4">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

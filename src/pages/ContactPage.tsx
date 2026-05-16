import { useState, type FormEvent } from 'react';
import { Send, Mail } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xqeggzyn', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-20">
          <p className="text-[#002366] text-xs font-bold uppercase tracking-[0.2em] mb-4">Contact Us</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-slate-500 text-lg">Have a question or ready to join? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded bg-[#002366]/10 flex items-center justify-center">
                <Mail size={18} className="text-[#002366]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Email</h3>
                <a href="mailto:hello@rugbyfan.co.uk" className="text-sm text-slate-500 hover:text-[#002366] transition-colors">
                  hello@rugbyfan.co.uk
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                  <input name="firstName" required className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                  <input name="lastName" required className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input name="email" type="email" required className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">I am a...</label>
                <select name="type" className="w-full px-4 py-3 border border-slate-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all cursor-pointer">
                  <option value="club">Rugby Club</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea name="message" rows={5} required className="w-full px-4 py-3 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#002366]/20 focus:border-[#002366] transition-all resize-none" />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#002366] text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-[#001a4d] transition-colors duration-200 disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                <Send size={14} />
              </button>
              {status === 'sent' && (
                <p className="text-green-600 text-sm font-medium">Message sent successfully. We'll be in touch soon.</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm font-medium">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

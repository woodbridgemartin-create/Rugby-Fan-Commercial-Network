import React, { useState } from 'react';
import { Mail, Send, HelpCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<{
    submitting: boolean;
    success: boolean;
    error: string | null;
  }>({
    submitting: false,
    success: false,
    error: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('https://formspree.io/f/xqeggzyn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject,
          Message: formData.message
        })
      });

      if (response.ok) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to safely transmit data payload.');
      }
    } catch (err: any) {
      console.error('Formspree Submission Error:', err);
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'An unexpected networking issue occurred. Please try again.'
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 antialiased">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Editorial Title Header */}
        <div className="bg-[#002366] text-white p-8 rounded-2xl shadow-sm text-center md:text-left">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">Get In Touch</span>
          <h1 className="text-3xl font-black uppercase tracking-tight">Contact the Network Team</h1>
          <p className="text-slate-300 text-xs mt-2 max-w-xl mx-auto md:mx-0">
            Have questions or feedback? Fill out the form below or email us directly, and our support team will get straight back to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Layout: General Contact Form */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            {status.success ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <Send size={20} />
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">Message Transmitted</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you for reaching out. Your entry has been securely wired to Formspree. A network team representative will review your message shortly.
                </p>
                <button 
                  onClick={() => setStatus({ submitting: false, success: false, error: null })}
                  className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* Error Banner State */}
                {status.error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2 font-medium">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-600 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#002366]" 
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#002366]" 
                      placeholder="name@domain.co.uk"
                    />
                  </div>
                </div>

                {/* Subject Line */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-600 uppercase tracking-wider">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#002366]" 
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Message Box */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-600 uppercase tracking-wider">Message Detail</label>
                  <textarea 
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#002366] resize-none" 
                    placeholder="Please type out your detailed message here..."
                  />
                </div>

                {/* Submit Action Button */}
                <button 
                  type="submit" 
                  disabled={status.submitting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002366] hover:bg-[#001a4d] text-white font-bold uppercase tracking-wider text-[10px] rounded transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.submitting ? 'Transmitting...' : 'Submit Message'} <Send size={12} />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar: Direct Support Channels */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">Direct Contact</h3>
              
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#002366] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-700">General Support</span>
                  <a href="mailto:hello@rugbyfan.co.uk" className="text-[#002366] font-semibold hover:underline">hello@rugbyfan.co.uk</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HelpCircle size={16} className="text-[#002366] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-700">Response Window</span>
                  <span className="text-slate-500">Monday - Friday<br />09:00 - 17:00 GMT</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

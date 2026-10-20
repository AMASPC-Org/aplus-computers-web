'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2, X, ShieldCheck, FileText } from 'lucide-react';
import { BUSINESS } from '@/data/business';
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '@/data/legal';
import { ContactSubmissionSchema, type ContactSubmission } from '@/lib/validation';
import { submitContactLead } from '@/lib/firebase';

export default function Footer() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  // Close modal on Escape key & lock background scroll when modal is open
  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    const validation = ContactSubmissionSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitContactLead(formData);
      setSubmitStatus({
        success: result.success,
        message: result.message,
      });

      if (result.success) {
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: 'Could not send message. Please call us at (360) 754-1311.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentDoc = activeModal === 'privacy' ? PRIVACY_POLICY : TERMS_OF_SERVICE;

  return (
    <footer id="contact" className="bg-[#0b121e] text-slate-300 pt-14 pb-8 sm:pt-20 sm:pb-12 border-t border-slate-800 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-slate-800/80">
          {/* Left Column: Logo & Contact Info */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="inline-block p-2 rounded-xl bg-white/95 max-w-[240px] shadow-sm">
              <Image
                src="/assets/aistudio/A__Computers_Logo_1200x198_png_01b4d9e2.png"
                alt="A+ Computers Olympia"
                width={240}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                Get in Touch
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-slate-300">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{BUSINESS.fullAddress}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <a
                    href={BUSINESS.phoneTel}
                    className="hover:text-emerald-400 transition font-semibold py-1"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                  <a
                    href={BUSINESS.emailMailto}
                    className="hover:text-emerald-400 transition font-medium break-all py-1"
                  >
                    {BUSINESS.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-400 pt-1">
              <p className="font-semibold text-slate-300 mb-1">Drop-off Shop Hours:</p>
              <p>{BUSINESS.hoursDisplay}</p>
              <p className="text-slate-500 mt-0.5">Saturday &ndash; Monday: Closed</p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border ${
                      errors.name ? 'border-red-500' : 'border-slate-700/80'
                    } text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border ${
                      errors.email ? 'border-red-500' : 'border-slate-700/80'
                    } text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="sr-only">
                    Phone (Optional)
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone (Optional)"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border ${
                      errors.phone ? 'border-red-500' : 'border-slate-700/80'
                    } text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border ${
                    errors.message ? 'border-red-500' : 'border-slate-700/80'
                  } text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {submitStatus && (
                <div
                  className={`p-3.5 rounded-xl text-xs sm:text-sm flex items-start gap-2.5 ${
                    submitStatus.success
                      ? 'bg-emerald-950/70 border border-emerald-800 text-emerald-200'
                      : 'bg-red-950/70 border border-red-800 text-red-200'
                  }`}
                >
                  {submitStatus.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#109848] hover:bg-[#0e803d] active:scale-[0.99] disabled:opacity-70 text-white font-bold text-base shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Interactive Modal Triggers for Privacy & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveModal('privacy')}
              className="hover:text-white underline underline-offset-4 transition py-1.5 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('terms')}
              className="hover:text-white underline underline-offset-4 transition py-1.5 cursor-pointer"
            >
              Terms of Service
            </button>
          </div>

          <p>&copy; 2026 {BUSINESS.shortName}. All rights reserved.</p>
        </div>
      </div>

      {/* Best-Practice Accessible Single-Page Modal for Privacy & Terms */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
              <div className="flex items-center gap-2.5">
                {activeModal === 'privacy' ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                <h2 id="legal-modal-title" className="text-lg sm:text-xl font-bold text-white">
                  {currentDoc.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm sm:text-base leading-relaxed text-slate-300">
              <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                Effective Date: {currentDoc.effectiveDate} &bull; {BUSINESS.name}
              </p>
              {currentDoc.sections.map((section, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h3 className="font-bold text-white text-base">
                    {section.heading}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer with Switcher & Close Button */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveModal(activeModal === 'privacy' ? 'terms' : 'privacy')}
                className="text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer"
              >
                View {activeModal === 'privacy' ? 'Terms of Service' : 'Privacy Policy'}
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-[#109848] hover:bg-[#0e803d] text-white font-bold text-sm transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

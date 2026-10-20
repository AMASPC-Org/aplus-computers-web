'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { BUSINESS } from '@/data/business';
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
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
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

    // Validate with Zod
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

  return (
    <footer id="contact" className="bg-[#0b121e] text-slate-300 pt-14 pb-8 sm:pt-20 sm:pb-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-slate-800/80">
          {/* Left Column: Logo & Contact Info (matching mockup) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Logo in dark footer */}
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
              <div className="space-y-2 text-sm text-slate-300">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <span>{BUSINESS.fullAddress}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={BUSINESS.phoneTel}
                    className="hover:text-emerald-400 transition font-medium"
                  >
                    {BUSINESS.phoneAltDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={BUSINESS.emailMailto}
                    className="hover:text-emerald-400 transition font-medium break-all"
                  >
                    {BUSINESS.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-400 pt-1">
              <p className="font-semibold text-slate-300 mb-1">Drop-off Shop Hours:</p>
              <p>{BUSINESS.hoursDisplay}</p>
              <p className="text-slate-500 mt-0.5">Saturday – Monday: Closed</p>
            </div>
          </div>

          {/* Right Column: Contact Form (matching mockup) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                      errors.name ? 'border-red-500' : 'border-slate-700/80'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                      errors.email ? 'border-red-500' : 'border-slate-700/80'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                    errors.message ? 'border-red-500' : 'border-slate-700/80'
                  } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Status Message feedback */}
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

              {/* Send Message Button matching mockup */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#109848] hover:bg-[#0e803d] active:scale-[0.99] disabled:opacity-70 text-white font-bold text-sm sm:text-base shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar matching mockup: Privacy Terms on left, © 2028 A+ Computers on right */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hover:text-slate-300 underline underline-offset-4 transition"
            >
              Privacy
            </a>
            <a
              href="#contact"
              className="hover:text-slate-300 underline underline-offset-4 transition"
            >
              Terms
            </a>
          </div>

          <p>© {BUSINESS.copyrightYear} {BUSINESS.shortName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

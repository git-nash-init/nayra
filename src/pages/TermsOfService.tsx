import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { BRAND_NAME, FORMATTED_PRICE, SITE_METADATA } from '../config/site';

interface LegalPageProps {
  onBackToHome: () => void;
}

export const TermsOfService: React.FC<LegalPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-canvas-base text-white py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted hover:text-white transition-colors py-1 px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </button>

        <div className="space-y-3 border-b border-white/10 pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block">
            TERMS &amp; CONDITIONS
          </span>
          <h1 className="text-4xl sm:text-5xl font-anton tracking-tight text-white uppercase leading-none">
            TERMS OF SERVICE
          </h1>
          <p className="text-xs font-mono text-muted">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • Draft for {BRAND_NAME}
          </p>
        </div>

        <div className="space-y-6 text-muted-light text-sm sm:text-base leading-relaxed">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
            <p className="text-xs text-muted">
              By accessing this website or purchasing membership access for {FORMATTED_PRICE}, you agree to be bound by these Terms of Service.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">1. Eligibility &amp; Age Requirement (18+)</h2>
            <p>
              You must be at least 18 years old to access this site or purchase membership. By completing checkout, you warrant that you are of legal adult age in your country or state of residence.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">2. Nature of the Digital Service</h2>
            <p>
              Membership grants digital access to a private Telegram channel curated by creator {BRAND_NAME}. Content includes uncompressed photographic sets, video reels, voice notes, and group/1-on-1 text interaction. Access is personal, non-transferable, and delivered digitally upon payment confirmation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">3. Intellectual Property &amp; Content Protection</h2>
            <p>
              All photographs, videos, audio notes, and text shared by {BRAND_NAME} are protected by copyright and intellectual property laws. You are granted a limited, personal, non-exclusive license to view content within Telegram. You strictly agree NOT to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li>Record, download for distribution, screenshot, rip, or re-upload content to external sites, forums, or cloud folders.</li>
              <li>Share, sell, or leak private Telegram invite links or channel media.</li>
              <li>Violations will result in immediate channel ban without refund and appropriate legal action.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">4. Community Conduct &amp; Harassment Policy</h2>
            <p>
              The private channel is a respectful, supportive environment. Hate speech, abusive language, non-consensual demands, stalking, harassment, or spam will result in immediate termination of channel access with zero refund.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">5. Contact &amp; Inquiries</h2>
            <p>
              Questions regarding these Terms can be addressed to <a href={`mailto:${SITE_METADATA.supportEmail}`} className="text-accent underline">{SITE_METADATA.supportEmail}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

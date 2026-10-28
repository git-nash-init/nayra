import React from 'react';
import { BRAND_NAME, FORMATTED_PRICE, SITE_METADATA } from '../config/site';

interface LegalPageProps {
  onBackToHome: () => void;
}

export const TermsOfService: React.FC<LegalPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-canvas-base text-white py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <button
          type="button"
          onClick={onBackToHome}
          className="link-couture eyebrow text-muted-light"
        >
          Back to {BRAND_NAME}
        </button>

        <div className="space-y-5 border-b border-hairline pb-10">
          <span className="eyebrow text-accent block">
            TERMS &amp; CONDITIONS
          </span>
          <h1 className="font-display text-5xl sm:text-6xl tracking-tighter text-white leading-none">
            TERMS OF SERVICE
          </h1>
          <p className="font-display italic text-muted">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} · Draft for {BRAND_NAME}
          </p>
        </div>

        <div className="space-y-10 text-muted-light text-[15px] sm:text-base leading-[1.85]">
          <div className="border border-hairline px-5 py-4">
            <p className="font-display italic text-muted-light">
              By accessing this website or purchasing membership access for {FORMATTED_PRICE}, you agree to be bound by these Terms of Service.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">I.</span>Eligibility &amp; Age Requirement (18+)</h2>
            <p>
              You must be at least 18 years old to access this site or purchase membership. By completing checkout, you warrant that you are of legal adult age in your country or state of residence.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">II.</span>Nature of the Digital Service</h2>
            <p>
              Membership grants digital access to a private Telegram channel curated by creator {BRAND_NAME}. Content includes uncompressed photographic sets, video reels, voice notes, and group/1-on-1 text interaction. Access is personal, non-transferable, and delivered digitally upon payment confirmation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">III.</span>Intellectual Property &amp; Content Protection</h2>
            <p>
              All photographs, videos, audio notes, and text shared by {BRAND_NAME} are protected by copyright and intellectual property laws. You are granted a limited, personal, non-exclusive license to view content within Telegram. You strictly agree NOT to:
            </p>
            <ul className="list-disc marker:text-accent pl-5 space-y-2 text-muted">
              <li>Record, download for distribution, screenshot, rip, or re-upload content to external sites, forums, or cloud folders.</li>
              <li>Share, sell, or leak private Telegram invite links or channel media.</li>
              <li>Violations will result in immediate channel ban without refund and appropriate legal action.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">IV.</span>Community Conduct &amp; Harassment Policy</h2>
            <p>
              The private channel is a respectful, supportive environment. Hate speech, abusive language, non-consensual demands, stalking, harassment, or spam will result in immediate termination of channel access with zero refund.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">V.</span>Contact &amp; Inquiries</h2>
            <p>
              Questions regarding these Terms can be addressed to <a href={`mailto:${SITE_METADATA.supportEmail}`} className="link-couture text-accent-light">{SITE_METADATA.supportEmail}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

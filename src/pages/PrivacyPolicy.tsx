import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { BRAND_NAME, SITE_METADATA } from '../config/site';

interface LegalPageProps {
  onBackToHome: () => void;
}

export const PrivacyPolicy: React.FC<LegalPageProps> = ({ onBackToHome }) => {
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
            LEGAL &amp; COMPLIANCE
          </span>
          <h1 className="text-4xl sm:text-5xl font-anton tracking-tight text-white uppercase leading-none">
            PRIVACY POLICY
          </h1>
          <p className="text-xs font-mono text-muted">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • Draft for {BRAND_NAME}
          </p>
        </div>

        <div className="space-y-6 text-muted-light text-sm sm:text-base leading-relaxed">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
            <p className="text-xs text-muted">
              This Privacy Policy explains how information is collected, used, and protected when you access the {BRAND_NAME} website and purchase private Telegram channel membership.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">1. Information We Collect</h2>
            <p>
              When you initiate checkout or subscribe to email notifications, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li><strong>Contact Information:</strong> Your name, email address, and Telegram username (@handle).</li>
              <li><strong>Transaction Records:</strong> Order reference identifiers and payment gateway confirmation statuses. Note: We do NOT store your credit card or UPI PIN numbers; these are handled directly by PCI-DSS certified payment processors.</li>
              <li><strong>Technical Logs:</strong> Standard browser user-agent, IP address, and device type for fraud prevention and secure access logging.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">2. How Your Information Is Used</h2>
            <p>
              Your data is used strictly for operational service delivery:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li>Generating and sending your verified invitation link to the private Telegram channel.</li>
              <li>Providing transaction receipts and customer support assistance.</li>
              <li>Ensuring compliance with our 18+ age verification requirement.</li>
              <li>Preventing fraudulent chargebacks, bot infiltration, and unauthorized link distribution.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">3. Data Sharing &amp; Third Parties</h2>
            <p>
              We do not sell, rent, or trade your personal data. We disclose information only to service providers essential for delivering your membership:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li><strong>Payment Processors:</strong> To complete financial authorization.</li>
              <li><strong>Telegram Platform:</strong> To verify channel membership and manage permissions.</li>
              <li><strong>Hosting &amp; Cloud Infrastructure:</strong> High-security server infrastructure.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">4. Age Restriction (18+ Adults Only)</h2>
            <p>
              This website and its associated private channel are exclusively intended for adults aged 18 years and older. We do not knowingly collect personal data from anyone under 18. If we discover a minor has registered, their access will be terminated immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">5. Data Retention &amp; Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your customer information by contacting our support team at <a href={`mailto:${SITE_METADATA.supportEmail}`} className="text-accent underline">{SITE_METADATA.supportEmail}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

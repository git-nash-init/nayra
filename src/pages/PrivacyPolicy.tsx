import React from 'react';
import { BRAND_NAME, SITE_METADATA } from '../config/site';

interface LegalPageProps {
  onBackToHome: () => void;
}

export const PrivacyPolicy: React.FC<LegalPageProps> = ({ onBackToHome }) => {
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
            LEGAL &amp; COMPLIANCE
          </span>
          <h1 className="font-display text-5xl sm:text-6xl tracking-tighter text-white leading-none">
            PRIVACY POLICY
          </h1>
          <p className="font-display italic text-muted">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} · Draft for {BRAND_NAME}
          </p>
        </div>

        <div className="space-y-10 text-muted-light text-[15px] sm:text-base leading-[1.85]">
          <div className="border border-hairline px-5 py-4">
            <p className="font-display italic text-muted-light">
              This Privacy Policy explains how information is collected, used, and protected when you access the {BRAND_NAME} website and purchase private Telegram channel membership.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">I.</span>Information We Collect</h2>
            <p>
              When you initiate checkout or subscribe to email notifications, we collect:
            </p>
            <ul className="list-disc marker:text-accent pl-5 space-y-2 text-muted">
              <li><strong>Contact Information:</strong> Your name, email address, and Telegram username (@handle).</li>
              <li><strong>Transaction Records:</strong> Order reference identifiers and payment gateway confirmation statuses. Note: We do NOT store your credit card or UPI PIN numbers; these are handled directly by PCI-DSS certified payment processors.</li>
              <li><strong>Technical Logs:</strong> Standard browser user-agent, IP address, and device type for fraud prevention and secure access logging.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">II.</span>How Your Information Is Used</h2>
            <p>
              Your data is used strictly for operational service delivery:
            </p>
            <ul className="list-disc marker:text-accent pl-5 space-y-2 text-muted">
              <li>Generating and sending your verified invitation link to the private Telegram channel.</li>
              <li>Providing transaction receipts and customer support assistance.</li>
              <li>Ensuring compliance with our 18+ age verification requirement.</li>
              <li>Preventing fraudulent chargebacks, bot infiltration, and unauthorized link distribution.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">III.</span>Data Sharing &amp; Third Parties</h2>
            <p>
              We do not sell, rent, or trade your personal data. We disclose information only to service providers essential for delivering your membership:
            </p>
            <ul className="list-disc marker:text-accent pl-5 space-y-2 text-muted">
              <li><strong>Payment Processors:</strong> To complete financial authorization.</li>
              <li><strong>Telegram Platform:</strong> To verify channel membership and manage permissions.</li>
              <li><strong>Hosting &amp; Cloud Infrastructure:</strong> High-security server infrastructure.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">IV.</span>Age Restriction (18+ Adults Only)</h2>
            <p>
              This website and its associated private channel are exclusively intended for adults aged 18 years and older. We do not knowingly collect personal data from anyone under 18. If we discover a minor has registered, their access will be terminated immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">V.</span>Data Retention &amp; Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your customer information by contacting our support team at <a href={`mailto:${SITE_METADATA.supportEmail}`} className="link-couture text-accent-light">{SITE_METADATA.supportEmail}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

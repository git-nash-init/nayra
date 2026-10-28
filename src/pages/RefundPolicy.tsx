import React from 'react';
import { BRAND_NAME, FORMATTED_PRICE, SITE_METADATA } from '../config/site';

interface LegalPageProps {
  onBackToHome: () => void;
}

export const RefundPolicy: React.FC<LegalPageProps> = ({ onBackToHome }) => {
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
            CANCELLATION &amp; REFUNDS
          </span>
          <h1 className="font-display text-5xl sm:text-6xl tracking-tighter text-white leading-none">
            REFUND POLICY
          </h1>
          <p className="font-display italic text-muted">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} · Draft for {BRAND_NAME}
          </p>
        </div>

        <div className="space-y-10 text-muted-light text-[15px] sm:text-base leading-[1.85]">
          <div className="border border-hairline px-5 py-4">
            <p className="font-display italic text-muted-light">
              Please review our policy regarding digital membership access fees before completing your {FORMATTED_PRICE} payment.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">I.</span>Digital Nature of Service</h2>
            <p>
              Due to the immediate delivery of digital access links and uncompressed media archives upon payment verification, all {FORMATTED_PRICE} payments are generally non-refundable once the Telegram invite link has been generated and accessed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">II.</span>Eligible Refund Exceptions</h2>
            <p>
              Refunds will be promptly investigated and approved in the following circumstances:
            </p>
            <ul className="list-disc marker:text-accent pl-5 space-y-2 text-muted">
              <li><strong>Duplicate Transactions:</strong> If your card or UPI was charged multiple times for a single membership request.</li>
              <li><strong>Technical Non-Delivery:</strong> If you completed payment but failed to receive a valid invite link and our technical support team cannot manually deliver your access within 48 hours of reporting.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-white"><span className="italic text-accent mr-3">III.</span>How to Request Assistance</h2>
            <p>
              To report a payment issue, email <a href={`mailto:${SITE_METADATA.supportEmail}`} className="link-couture text-accent-light">{SITE_METADATA.supportEmail}</a> with your full name, transaction date, payment reference identifier, and Telegram handle. Requests are typically processed within 24 to 48 hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

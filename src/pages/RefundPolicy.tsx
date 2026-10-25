import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { BRAND_NAME, FORMATTED_PRICE, SITE_METADATA } from '../config/site';

interface LegalPageProps {
  onBackToHome: () => void;
}

export const RefundPolicy: React.FC<LegalPageProps> = ({ onBackToHome }) => {
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
            CANCELLATION &amp; REFUNDS
          </span>
          <h1 className="text-4xl sm:text-5xl font-anton tracking-tight text-white uppercase leading-none">
            REFUND POLICY
          </h1>
          <p className="text-xs font-mono text-muted">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • Draft for {BRAND_NAME}
          </p>
        </div>

        <div className="space-y-6 text-muted-light text-sm sm:text-base leading-relaxed">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
            <p className="text-xs text-muted">
              Please review our policy regarding digital membership access fees before completing your {FORMATTED_PRICE} payment.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">1. Digital Nature of Service</h2>
            <p>
              Due to the immediate delivery of digital access links and uncompressed media archives upon payment verification, all {FORMATTED_PRICE} payments are generally non-refundable once the Telegram invite link has been generated and accessed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">2. Eligible Refund Exceptions</h2>
            <p>
              Refunds will be promptly investigated and approved in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              <li><strong>Duplicate Transactions:</strong> If your card or UPI was charged multiple times for a single membership request.</li>
              <li><strong>Technical Non-Delivery:</strong> If you completed payment but failed to receive a valid invite link and our technical support team cannot manually deliver your access within 48 hours of reporting.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">3. How to Request Assistance</h2>
            <p>
              To report a payment issue, email <a href={`mailto:${SITE_METADATA.supportEmail}`} className="text-accent underline">{SITE_METADATA.supportEmail}</a> with your full name, transaction date, payment reference identifier, and Telegram handle. Requests are typically processed within 24 to 48 hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { BRAND_NAME, FORMATTED_PRICE } from '../config/site';
import { HERO_MEDIA } from '../config/media';
import { CheckoutFormData, PaymentOrder, PaymentStatus } from '../types';
import { paymentService } from '../services/payment';
import { Button } from '../components/ui/Button';
import { MediaFrame } from '../components/ui/MediaFrame';
import { toRoman } from '../lib/roman';

const SUMMARY_LINES = [
  'Daily uncompressed photographs',
  'Uncut films and daily greetings',
  'Personal text and voice replies',
];

interface CheckoutPageProps {
  onBackToHome: () => void;
  onNavigatePage: (page: 'home' | 'privacy' | 'terms' | 'refund' | 'checkout' | 'moments') => void;
}

export const CheckoutPage = ({
  onBackToHome,
  onNavigatePage,
}: CheckoutPageProps) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    telegramUsername: '',
    agreedToTerms: false,
    confirmedAge18Plus: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address for receipt delivery.';
    }
    if (!formData.telegramUsername.trim()) {
      errs.telegramUsername = 'Please enter your Telegram handle (e.g. @yourname) for channel invite.';
    }
    if (!formData.confirmedAge18Plus) {
      errs.confirmedAge18Plus = 'You must confirm that you are at least 18 years of age.';
    }
    if (!formData.agreedToTerms) {
      errs.agreedToTerms = 'You must accept the Terms of Service and Privacy Policy.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('processing');
    setErrorMessage('');

    try {
      const createdOrder = await paymentService.createOrder(formData);
      setOrder(createdOrder);

      // Verify payment configuration state
      if (!paymentService.isConfigured()) {
        // Honest notification: live payment provider keys are not yet configured
        setStatus('pending');
        setErrorMessage(
          'Live payment gateway keys have not been configured by the owner yet. Once Razorpay/Cashfree/Stripe keys are added to .env, this button will launch secure checkout.'
        );
        return;
      }

      // If configured, trigger live gateway verification flow
      const result = await paymentService.verifyPayment(createdOrder.orderId);
      if (result.success && result.inviteLink) {
        setOrder({
          ...createdOrder,
          status: 'success',
          inviteLink: result.inviteLink,
        });
        setStatus('success');
      } else {
        setStatus('failed');
        setErrorMessage(result.error || 'Payment authorization failed.');
      }
    } catch (err: unknown) {
      setStatus('failed');
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred during checkout initialization.'
      );
    }
  };

  const inputClass =
    'w-full px-0 py-3 bg-transparent border-0 border-b border-hairline text-white text-[15px] placeholder:text-muted-dark focus:outline-none focus:border-accent transition-colors duration-200';
  const labelClass = 'eyebrow text-muted-light block';
  const errorClass = 'text-sm text-[#d9826f] font-display italic';
  const checkboxClass =
    'appearance-none w-4 h-4 mt-1 shrink-0 border border-accent bg-transparent checked:bg-accent cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-base';

  return (
    <div className="min-h-screen bg-canvas-base text-white py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-14">
          <button type="button" onClick={onBackToHome} className="link-couture eyebrow text-muted-light">
            Back to {BRAND_NAME}
          </button>
          <span className="font-display text-xl tracking-masthead text-white">{BRAND_NAME}</span>
        </div>

        {/* Success */}
        {status === 'success' && order && (
          <div className="border border-accent/60 p-[7px] max-w-2xl mx-auto">
            <div className="border border-hairline px-6 py-14 sm:px-14 text-center space-y-8">
              <p className="eyebrow text-accent">Payment verified</p>
              <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight tracking-tighter">
                Welcome to the <em className="text-accent-light">circle</em>.
              </h1>
              <p className="text-muted max-w-lg mx-auto leading-[1.85]">
                Your membership is confirmed. Use your invitation below to enter {BRAND_NAME}’s private Telegram channel.
              </p>

              {order.inviteLink && (
                <Button asAnchor href={order.inviteLink} variant="solid" size="lg" className="w-full max-w-md">
                  Enter the private channel
                </Button>
              )}

              <dl className="max-w-md mx-auto text-left text-sm border-t border-hairline pt-6 space-y-2">
                <div className="flex justify-between gap-4">
                  <dt className="eyebrow text-muted-dark">Reference</dt>
                  <dd className="text-muted-light">{order.orderId}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="eyebrow text-muted-dark">Telegram</dt>
                  <dd className="text-muted-light">{order.telegramUsername}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="eyebrow text-muted-dark">Email</dt>
                  <dd className="text-muted-light">{order.customerEmail}</dd>
                </div>
              </dl>

              <Button variant="secondary" size="md" onClick={onBackToHome}>
                Return to {BRAND_NAME}
              </Button>
            </div>
          </div>
        )}

        {status !== 'success' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
            {/* Summary */}
            <aside className="lg:col-span-5 space-y-10">
              <MediaFrame src={HERO_MEDIA.main.src} alt={BRAND_NAME} aspectRatio="4/3" inset loading="eager" />

              <div>
                <p className="eyebrow text-accent">Admit one</p>
                <h2 className="font-display text-3xl text-white mt-3">The {BRAND_NAME} private channel</h2>
                <ol className="mt-6 space-y-3 text-[15px] text-muted-light">
                  {SUMMARY_LINES.map((line, i) => (
                    <li key={line} className="grid grid-cols-[2rem_1fr] items-baseline">
                      <span className="font-display italic text-accent">{toRoman(i + 1)}</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-y border-hairline py-6 flex items-baseline justify-between">
                <span className="eyebrow text-muted">Total due</span>
                <div className="text-right">
                  <span className="font-display text-5xl text-accent-light leading-none">{FORMATTED_PRICE}</span>
                  <span className="eyebrow text-muted-dark block mt-2">One-time · No renewal</span>
                </div>
              </div>

              <p className="text-sm text-muted leading-[1.85]">
                <span className="font-display italic text-muted-light">Discreet and protected. </span>
                Your details travel over encrypted channels, and the invitation is delivered to your verified
                Telegram handle.
              </p>
            </aside>

            {/* Form */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <p className="eyebrow text-muted">Member checkout</p>
                <h1 className="font-display text-4xl sm:text-5xl text-white mt-3 tracking-tighter">
                  Your <em className="text-accent-light">details</em>
                </h1>
                <p className="text-muted mt-3 leading-relaxed">
                  We use these to send your personal Telegram invitation.
                </p>
              </div>

              {status === 'pending' && (
                <div className="border border-accent/50 px-5 py-4 text-sm text-muted-light space-y-2">
                  <p className="eyebrow text-accent">Setup mode</p>
                  <p className="leading-relaxed">{errorMessage}</p>
                  <p className="text-xs text-muted">
                    To activate live UPI and card payments, set{' '}
                    <code className="text-accent-light">VITE_PAYMENT_GATEWAY_KEY_ID</code> in{' '}
                    <code className="text-accent-light">.env</code>.
                  </p>
                </div>
              )}

              {status === 'failed' && (
                <div className="border border-[#d9826f]/50 px-5 py-4 text-sm space-y-1">
                  <p className="eyebrow text-[#d9826f]">Checkout could not complete</p>
                  <p className="text-muted-light">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                <div className="space-y-1">
                  <label htmlFor="fullName" className={labelClass}>Full name</label>
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your name"
                    className={inputClass}
                  />
                  {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className={labelClass}>Email address</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="telegramUsername" className={labelClass}>Telegram username</label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 font-display italic text-accent">@</span>
                    <input
                      id="telegramUsername"
                      type="text"
                      value={formData.telegramUsername.replace(/^@/, '')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          telegramUsername: `@${e.target.value.replace(/^@/, '')}`,
                        })
                      }
                      placeholder="your_handle"
                      className={`${inputClass} pl-5`}
                    />
                  </div>
                  {errors.telegramUsername && <p className={errorClass}>{errors.telegramUsername}</p>}
                  <p className="text-xs text-muted-dark pt-1">Your invitation is issued to this handle.</p>
                </div>

                <div className="pt-6 space-y-4 border-t border-hairline">
                  <label className="flex items-start gap-4 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.confirmedAge18Plus}
                      onChange={(e) => setFormData({ ...formData, confirmedAge18Plus: e.target.checked })}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-muted-light leading-relaxed">
                      I confirm that I am <span className="text-white">18 years of age or older</span> and legally
                      able to access adult creator content where I live.
                    </span>
                  </label>
                  {errors.confirmedAge18Plus && <p className={`${errorClass} pl-8`}>{errors.confirmedAge18Plus}</p>}

                  <label className="flex items-start gap-4 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                      className={checkboxClass}
                    />
                    <span className="text-sm text-muted-light leading-relaxed">
                      I agree to the{' '}
                      <button type="button" onClick={() => onNavigatePage('terms')} className="link-couture text-white">
                        Terms of Service
                      </button>
                      ,{' '}
                      <button type="button" onClick={() => onNavigatePage('privacy')} className="link-couture text-white">
                        Privacy Policy
                      </button>{' '}
                      and{' '}
                      <button type="button" onClick={() => onNavigatePage('refund')} className="link-couture text-white">
                        Refund Policy
                      </button>
                      .
                    </span>
                  </label>
                  {errors.agreedToTerms && <p className={`${errorClass} pl-8`}>{errors.agreedToTerms}</p>}
                </div>

                <div className="pt-2 space-y-4">
                  <Button
                    type="submit"
                    variant="solid"
                    size="lg"
                    disabled={status === 'processing'}
                    className="w-full disabled:opacity-60 disabled:cursor-wait"
                  >
                    {status === 'processing' ? 'Verifying' : `Pay ${FORMATTED_PRICE} · Receive invitation`}
                  </Button>
                  <p className="eyebrow text-muted-dark text-center">Secure checkout · Strictly 18+</p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

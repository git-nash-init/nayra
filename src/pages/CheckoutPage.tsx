import { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { BRAND_NAME, FORMATTED_PRICE } from '../config/site';
import { HERO_MEDIA } from '../config/media';
import { CheckoutFormData, PaymentOrder, PaymentStatus } from '../types';
import { paymentService } from '../services/payment';
import { Button } from '../components/ui/Button';

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

  return (
    <div className="min-h-screen bg-canvas-base text-white py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted hover:text-white transition-colors mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded py-1 px-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </button>

        {/* Success State Screen */}
        {status === 'success' && order && (
          <div className="rounded-3xl bg-canvas-surface border border-emerald-500/30 p-8 sm:p-12 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-anton text-white tracking-wide uppercase">
              PAYMENT VERIFIED! WELCOME TO THE CIRCLE
            </h1>

            <p className="text-muted text-base max-w-lg mx-auto">
              Your membership pass has been successfully verified. Tap the button below to join {BRAND_NAME}’s private Telegram channel.
            </p>

            {order.inviteLink && (
              <div className="pt-4 max-w-md mx-auto">
                <a
                  href={order.inviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-accent hover:bg-accent-hover text-black font-semibold text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,73,37,0.35)] transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Private Telegram Channel Now
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            )}

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-muted font-mono max-w-md mx-auto text-left space-y-1">
              <p><span className="text-white">Order Reference:</span> {order.orderId}</p>
              <p><span className="text-white">Telegram Handle:</span> {order.telegramUsername}</p>
              <p><span className="text-white">Email:</span> {order.customerEmail}</p>
            </div>

            <div className="pt-6">
              <Button variant="secondary" size="md" onClick={onBackToHome}>
                Return to Homepage
              </Button>
            </div>
          </div>
        )}

        {/* Default Checkout Form Layout */}
        {status !== 'success' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Product & Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-canvas-surface border border-hairline p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={HERO_MEDIA.main.src}
                    alt={BRAND_NAME}
                    className="w-20 h-20 rounded-2xl object-cover object-top border border-white/10 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
                      VIP PASS
                    </span>
                    <h2 className="text-xl font-anton text-white tracking-wide uppercase leading-tight">
                      {BRAND_NAME} Telegram Access
                    </h2>
                    <p className="text-xs text-muted font-mono mt-0.5">
                      Direct 1-on-1 Chat &amp; Photo Vault
                    </p>
                  </div>
                </div>

                <div className="py-4 border-t border-b border-white/10 space-y-2 text-xs text-muted-light">
                  <p className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    Daily uncompressed HD photo releases
                  </p>
                  <p className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    Uncut video reels and daily greetings
                  </p>
                  <p className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    Direct text &amp; voice message replies
                  </p>
                </div>

                {/* Final Price Line */}
                <div className="flex items-baseline justify-between pt-2">
                  <span className="text-sm font-medium text-white">Total Amount Due</span>
                  <div className="text-right">
                    <span className="text-3xl font-anton text-accent tracking-tight">
                      {FORMATTED_PRICE}
                    </span>
                    <span className="text-xs font-mono text-muted uppercase block">
                      One-time payment • No renewal
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust & Security Notes */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs text-muted">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Discreet &amp; Protected Transaction</span>
                </div>
                <p>
                  Your details are processed through encrypted channels. The channel invitation is delivered directly to your verified Telegram handle.
                </p>
              </div>
            </div>

            {/* Right: Checkout Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-canvas-surface border border-hairline p-6 sm:p-10 space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-anton text-white tracking-wide uppercase">
                    MEMBER CHECKOUT
                  </h1>
                  <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">
                    Provide your details to receive your verified Telegram channel link
                  </p>
                </div>

                {/* Live Payment Status Banner (Transparently informing user of gateway status) */}
                {status === 'pending' && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Payment Provider Boundary Active (Setup Mode)</span>
                    </div>
                    <p className="leading-relaxed">
                      {errorMessage}
                    </p>
                    <p className="text-[11px] text-amber-300/80 font-mono">
                      To activate live UPI / Card transactions, configure <code className="bg-black/40 px-1 py-0.5 rounded">VITE_PAYMENT_GATEWAY_KEY_ID</code> in <code className="bg-black/40 px-1 py-0.5 rounded">.env</code>.
                    </p>
                  </div>
                )}

                {status === 'failed' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Checkout Encountered an Issue</p>
                      <p className="mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-xs font-mono uppercase tracking-wider text-muted-light block">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-muted focus:outline-none focus:border-accent text-sm transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-400 font-mono">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-light block">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. yourname@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-muted focus:outline-none focus:border-accent text-sm transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 font-mono">{errors.email}</p>
                    )}
                  </div>

                  {/* Telegram Username */}
                  <div className="space-y-1.5">
                    <label htmlFor="telegramUsername" className="text-xs font-mono uppercase tracking-wider text-muted-light block">
                      Telegram Username <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-mono text-sm">
                        @
                      </span>
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
                        placeholder="your_telegram_handle"
                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-muted focus:outline-none focus:border-accent text-sm transition-colors font-mono"
                      />
                    </div>
                    {errors.telegramUsername && (
                      <p className="text-xs text-red-400 font-mono">{errors.telegramUsername}</p>
                    )}
                    <p className="text-[11px] text-muted font-mono">
                      Your unique channel invite link is keyed to this handle.
                    </p>
                  </div>

                  {/* Mandatory Age & Terms Confirmation (NO intrusive popups, explicit accessible checkboxes NOT preselected) */}
                  <div className="pt-4 space-y-3 border-t border-white/10">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.confirmedAge18Plus}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmedAge18Plus: e.target.checked })
                        }
                        className="w-4 h-4 mt-0.5 rounded border-white/20 bg-black/60 text-accent focus:ring-accent focus:ring-offset-canvas-base"
                      />
                      <span className="text-xs text-muted-light leading-relaxed">
                        I confirm that I am <strong className="text-white font-semibold">18 years of age or older</strong> and possess the legal capacity to access adult creator content in my jurisdiction. <span className="text-accent">*</span>
                      </span>
                    </label>
                    {errors.confirmedAge18Plus && (
                      <p className="text-xs text-red-400 font-mono pl-7">{errors.confirmedAge18Plus}</p>
                    )}

                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) =>
                          setFormData({ ...formData, agreedToTerms: e.target.checked })
                        }
                        className="w-4 h-4 mt-0.5 rounded border-white/20 bg-black/60 text-accent focus:ring-accent focus:ring-offset-canvas-base"
                      />
                      <span className="text-xs text-muted-light leading-relaxed">
                        I agree to the{' '}
                        <button
                          type="button"
                          onClick={() => onNavigatePage('terms')}
                          className="text-white underline hover:text-accent"
                        >
                          Terms of Service
                        </button>
                        ,{' '}
                        <button
                          type="button"
                          onClick={() => onNavigatePage('privacy')}
                          className="text-white underline hover:text-accent"
                        >
                          Privacy Policy
                        </button>
                        , and{' '}
                        <button
                          type="button"
                          onClick={() => onNavigatePage('refund')}
                          className="text-white underline hover:text-accent"
                        >
                          Refund Terms
                        </button>
                        . <span className="text-accent">*</span>
                      </span>
                    </label>
                    {errors.agreedToTerms && (
                      <p className="text-xs text-red-400 font-mono pl-7">{errors.agreedToTerms}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={status === 'processing'}
                      icon={<Lock className="w-4 h-4" />}
                      className="w-full text-sm sm:text-base py-4 font-semibold shadow-[0_0_30px_rgba(255,73,37,0.3)]"
                    >
                      {status === 'processing'
                        ? 'Verifying...'
                        : `Pay ${FORMATTED_PRICE} & Get Telegram Access`}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

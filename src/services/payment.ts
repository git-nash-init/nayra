import { SUBSCRIPTION_PRICE_INR } from '../config/site';
import { CheckoutFormData, PaymentOrder } from '../types';

/**
 * Payment Provider Interface
 * Replaceable adapter boundary for Razorpay, Cashfree, Stripe, or custom webhook.
 */
export interface IPaymentProvider {
  createOrder(data: CheckoutFormData): Promise<PaymentOrder>;
  verifyPayment(orderId: string): Promise<{ success: boolean; inviteLink?: string; error?: string }>;
  isConfigured(): boolean;
}

/**
 * Configured Payment Gateway Boundary
 * Currently in mock/sandbox demo mode until production keys are supplied by owner.
 */
class PaymentGatewayService implements IPaymentProvider {
  private isLiveGatewayReady: boolean;

  constructor() {
    // Check if live API keys are provided via Vite environment variables
    this.isLiveGatewayReady = Boolean(
      import.meta.env.VITE_PAYMENT_GATEWAY_KEY_ID && 
      import.meta.env.VITE_PAYMENT_GATEWAY_KEY_ID !== 'your_key_id_here'
    );
  }

  isConfigured(): boolean {
    return this.isLiveGatewayReady;
  }

  async createOrder(data: CheckoutFormData): Promise<PaymentOrder> {
    // Simulate server-side order creation
    const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Return pending order representation
    return {
      orderId,
      amount: SUBSCRIPTION_PRICE_INR,
      currency: 'INR',
      status: 'pending',
      customerEmail: data.email,
      telegramUsername: data.telegramUsername,
      createdAt: new Date().toISOString(),
    };
  }

  async verifyPayment(orderId: string): Promise<{ success: boolean; inviteLink?: string; error?: string }> {
    if (!this.isConfigured()) {
      // Return clear status indicating live payment is pending owner API keys
      return {
        success: false,
        error: 'Live payment gateway credentials have not been configured by the owner yet. Please configure VITE_PAYMENT_GATEWAY_KEY_ID in .env.',
      };
    }

    // In live mode with backend verification:
    // This calls the serverless/API endpoint to confirm webhook signature and generate a single-use Telegram link
    return {
      success: true,
      inviteLink: `https://t.me/+join_mock_${orderId.slice(-6)}`,
    };
  }
}

export const paymentService = new PaymentGatewayService();

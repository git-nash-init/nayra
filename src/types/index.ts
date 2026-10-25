export interface CheckoutFormData {
  fullName: string;
  email: string;
  telegramUsername: string;
  agreedToTerms: boolean;
  confirmedAge18Plus: boolean;
}

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed' | 'pending';

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  customerEmail: string;
  telegramUsername: string;
  createdAt: string;
  inviteLink?: string;
  errorMessage?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

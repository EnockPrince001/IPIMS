// src/data/models/Sales.ts
// Define interfaces for Sales-related data

export interface ISaleOrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number; // quantity * unitPrice
  discountAmount: number;
  netPrice: number; // totalPrice - discountAmount
  dispensedByUserId?: string; // ID of the user who dispensed this specific item
  batchNumber?: string;
  // TODO: Add fields for tax, return status, etc.
}

export interface ISaleOrder {
  id: string;
  transactionDate: string; // ISO Date string
  customerId?: string; // Optional for walk-in customers
  customerName?: string;
  totalAmount: number; // Sum of net prices of all items
  totalDiscount: number;
  netAmount: number; // totalAmount - totalDiscount
  taxAmount: number;
  grandTotal: number; // netAmount + taxAmount
  paymentStatus: 'pending' | 'paid' | 'partial' | 'refunded';
  paymentMethodId?: string; // ID of the primary payment method
  cashierId: string; // ID of the user who processed the sale
  items: ISaleOrderItem[];
  isSuspended: boolean;
  notes?: string;
  // TODO: Add fields for return policy, delivery info, etc.
}

export interface IPayment {
  id: string;
  saleOrderId: string;
  amount: number;
  paymentMethodId: string;
  paymentMethodName: string;
  paymentDate: string; // ISO Date string
  receivedByUserId: string;
  // TODO: Add transaction reference, status etc.
}

export interface IPaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'card' | 'mobile_money' | 'insurance';
  isActive: boolean;
  // TODO: Add processing fees, integration details
}

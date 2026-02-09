// src/services/salesService.ts
// This service handles API calls related to sales and transactions

import { salesClient } from '../config';
import { gql } from '@apollo/client';
import { ISaleOrder, IPayment } from '../data/models';

// TODO: Define your GraphQL queries and mutations for sales
const GET_SALE_ORDERS_QUERY = gql`
  query GetSaleOrders {
    saleOrders {
      id
      transactionDate
      customerName
      totalAmount
      paymentStatus
      cashierId
      // TODO: Add all fields you need
    }
  }
`;

const CREATE_SALE_ORDER_MUTATION = gql`
  mutation CreateSaleOrder($input: CreateSaleOrderInput!) {
    createSaleOrder(input: $input) {
      id
      totalAmount
      // TODO: Add all fields you expect to get back
    }
  }
`;

class SalesService {
  public async getSaleOrders(): Promise<ISaleOrder[]> {
    // TODO: Implement fetching logic
    try {
      const { data } = await salesClient.query({
        query: GET_SALE_ORDERS_QUERY,
        fetchPolicy: 'network-only',
      });
      return data.saleOrders || [];
    } catch (error) {
      console.error('SalesService: Error fetching sale orders', error);
      throw error;
    }
  }

  public async createSaleOrder(order: Partial<ISaleOrder>): Promise<ISaleOrder> {
    // TODO: Implement creation logic
    try {
      const { data } = await salesClient.mutate({
        mutation: CREATE_SALE_ORDER_MUTATION,
        variables: { input: order },
      });
      return data.createSaleOrder;
    } catch (error) {
      console.error('SalesService: Error creating sale order', error);
      throw error;
    }
  }

  public async processPayment(payment: Partial<IPayment>): Promise<IPayment> {
    // TODO: Implement payment processing logic
    return { ...payment, id: 'mock-payment-id', paymentDate: new Date().toISOString() } as IPayment;
  }

  // TODO: Add update, delete, getById, suspend/resume, reverse sale order methods
}

export const salesService = new SalesService();

// src/services/setupService.ts
// This service handles API calls related to application setup and configuration (e.g., payment methods, general settings)

import { setupClient } from '../config';
import { gql } from '@apollo/client';
import { IPaymentMethod } from '../data/models';
import { PharmacyConfigState } from '../store/reducers/pharmacyConfigReducer';

// TODO: Define your GraphQL queries and mutations for setup
const GET_PAYMENT_METHODS_QUERY = gql`
  query GetPaymentMethods {
    paymentMethods {
      id
      name
      type
      isActive
    }
  }
`;

const GET_PHARMACY_CONFIG_QUERY = gql`
  query GetPharmacyConfig {
    pharmacyConfig {
      pharmacyName
      address
      contactEmail
      contactPhone
      taxRate
      defaultCurrency
      // TODO: Add other config fields
    }
  }
`;

class SetupService {
  public async getPaymentMethods(): Promise<IPaymentMethod[]> {
    // TODO: Implement fetching logic
    try {
      const { data } = await setupClient.query({
        query: GET_PAYMENT_METHODS_QUERY,
        fetchPolicy: 'network-only',
      });
      return data.paymentMethods || [];
    } catch (error) {
      console.error('SetupService: Error fetching payment methods', error);
      throw error;
    }
  }

  public async getPharmacyConfig(): Promise<PharmacyConfigState> {
    // TODO: Implement fetching logic
    try {
      const { data } = await setupClient.query({
        query: GET_PHARMACY_CONFIG_QUERY,
        fetchPolicy: 'network-only',
      });
      return data.pharmacyConfig;
    } catch (error) {
      console.error('SetupService: Error fetching pharmacy config', error);
      throw error;
    }
  }

  // TODO: Add methods for managing other setup items like drug classifications, business rules, etc.
}

export const setupService = new SetupService();

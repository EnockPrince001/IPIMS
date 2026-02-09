// src/services/inventoryService.ts
// This service handles API calls related to inventory management

import { inventoryClient } from '../config';
import { gql } from '@apollo/client';
import { IPharmacyProduct, ISupplier, IDrugClassification } from '../data/models';

// TODO: Define your GraphQL queries and mutations for inventory
const GET_PHARMACY_PRODUCTS_QUERY = gql`
  query GetPharmacyProducts {
    pharmacyProducts {
      id
      name
      genericName
      strength
      dosageForm
      unitPrice
      stockLevel
      isPrescriptionRequired
      // TODO: Add all fields you need
    }
  }
`;

const CREATE_PHARMACY_PRODUCT_MUTATION = gql`
  mutation CreatePharmacyProduct($input: CreatePharmacyProductInput!) {
    createPharmacyProduct(input: $input) {
      id
      name
      // TODO: Add all fields you expect to get back
    }
  }
`;

class InventoryService {
  public async getPharmacyProducts(): Promise<IPharmacyProduct[]> {
    // TODO: Implement fetching logic
    try {
      const { data } = await inventoryClient.query({
        query: GET_PHARMACY_PRODUCTS_QUERY,
        fetchPolicy: 'network-only',
      });
      return data.pharmacyProducts || [];
    } catch (error) {
      console.error('InventoryService: Error fetching pharmacy products', error);
      throw error;
    }
  }

  public async createPharmacyProduct(product: Partial<IPharmacyProduct>): Promise<IPharmacyProduct> {
    // TODO: Implement creation logic
    try {
      const { data } = await inventoryClient.mutate({
        mutation: CREATE_PHARMACY_PRODUCT_MUTATION,
        variables: { input: product },
      });
      return data.createPharmacyProduct;
    } catch (error) {
      console.error('InventoryService: Error creating pharmacy product', error);
      throw error;
    }
  }

  // TODO: Add update, delete, getById, getSuppliers, getDrugClassifications methods
  public async getSuppliers(): Promise<ISupplier[]> {
    // Placeholder for fetching suppliers
    return [
      { id: '1', name: 'PharmaCorp', contactPerson: 'John Doe' },
      { id: '2', name: 'MediSupply', contactPerson: 'Jane Smith' },
    ];
  }

  public async getDrugClassifications(): Promise<IDrugClassification[]> {
    // Placeholder for fetching drug classifications
    return [
      { id: '1', name: 'Antibiotics' },
      { id: '2', name: 'Painkillers' },
    ];
  }
}

export const inventoryService = new InventoryService();

// src/data/models/Inventory.ts
// Define interfaces for Inventory-related data

export interface IPharmacyProduct {
  id: string;
  name: string;
  genericName?: string;
  strength?: string;
  dosageForm?: string; // e.g., 'Tablet', 'Liquid', 'Capsule'
  unitPrice: number;
  costPrice?: number;
  stockLevel: number;
  reorderPoint?: number;
  expiryDate?: string; // ISO Date string
  batchNumber?: string;
  drugClassificationId?: string;
  supplierId?: string;
  isPrescriptionRequired: boolean;
  // TODO: Add more fields like imageUrl, description, etc.
}

export interface IDrugClassification {
  id: string;
  name: string;
  description?: string;
  // TODO: Add hierarchy if classifications are nested
}

export interface ISupplier {
  id: string;
  name: string;
  contactPerson?: string;
  contactNumber?: string;
  address?: string;
  // TODO: Add more supplier details
}

export interface IInventoryMovement {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  type: 'in' | 'out' | 'transfer_in' | 'transfer_out' | 'waste';
  date: string; // ISO Date string
  // TODO: Add source/destination location for transfers, reason for waste, etc.
}

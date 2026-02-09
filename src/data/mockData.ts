// src/data/mockData.ts
import { IPharmacyProduct, IPatient, IPermission } from './models';

// --- Mock Pharmacy Products ---
export const mockProducts: IPharmacyProduct[] = [
  {
    id: 'prod_001',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    strength: '500mg',
    dosageForm: 'Tablet',
    unitPrice: 10,
    stockLevel: 250,
    isPrescriptionRequired: false,
    reorderPoint: 50,
  },
  {
    id: 'prod_002',
    name: 'Amoxicillin 250mg',
    genericName: 'Amoxicillin',
    strength: '250mg',
    dosageForm: 'Capsule',
    unitPrice: 150,
    stockLevel: 120,
    isPrescriptionRequired: true,
    reorderPoint: 30,
  },
  {
    id: 'prod_003',
    name: 'Cough Syrup 100ml',
    genericName: 'Dextromethorphan',
    strength: '15mg/5ml',
    dosageForm: 'Liquid',
    unitPrice: 250,
    stockLevel: 80,
    isPrescriptionRequired: false,
    reorderPoint: 20,
  },
  {
    id: 'prod_004',
    name: 'Ibuprofen 200mg',
    genericName: 'Ibuprofen',
    strength: '200mg',
    dosageForm: 'Tablet',
    unitPrice: 25,
    stockLevel: 300,
    isPrescriptionRequired: false,
    reorderPoint: 75,
  },
  {
    id: 'prod_005',
    name: 'Azithromycin 500mg',
    genericName: 'Azithromycin',
    strength: '500mg',
    dosageForm: 'Tablet',
    unitPrice: 300,
    stockLevel: 45, // Low stock example
    isPrescriptionRequired: true,
    reorderPoint: 25,
  },
  {
    id: 'prod_006',
    name: 'Multivitamin Gummies',
    genericName: 'Vitamins',
    strength: 'N/A',
    dosageForm: 'Gummy',
    unitPrice: 800,
    stockLevel: 90,
    isPrescriptionRequired: false,
    reorderPoint: 30,
  },
  {
    id: 'prod_007',
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine',
    strength: '10mg',
    dosageForm: 'Tablet',
    unitPrice: 75,
    stockLevel: 150,
    isPrescriptionRequired: false,
    reorderPoint: 40,
  },
];

// --- Mock Patients ---
export const mockPatients: IPatient[] = [
  {
    id: 'pat_001',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-05-20',
    contactNumber: '0712345678',
  },
  {
    id: 'pat_002',
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: '1992-11-15',
    contactNumber: '0723456789',
  },
  {
    id: 'pat_003',
    firstName: 'Peter',
    lastName: 'Jones',
    dateOfBirth: '1978-01-30',
    contactNumber: '0734567890',
  },
  {
    id: 'pat_004',
    firstName: 'Mary',
    lastName: 'Williams',
    dateOfBirth: '2001-07-10',
    contactNumber: '0745678901',
  },
];


// --- Mock Roles & Permissions ---

// Permissions for a Pharmacist
export const pharmacistPermissions: IPermission[] = [
  { entity: 'Dashboard', permissions: { read: true } },
  { entity: 'SaleOrder', permissions: { create: true, read: true, update: false, delete: false } },
  { entity: 'PharmacyProduct', permissions: { create: false, read: true, update: false, delete: false } },
  { entity: 'Patient', permissions: { create: true, read: true, update: true, delete: false } },
  { entity: 'Prescription', permissions: { create: true, read: true, update: true, delete: false, dispense: true } },
  { entity: 'Report', permissions: { read: true } },
  { entity: 'User', permissions: { read: false } },
  { entity: 'Role', permissions: { read: false } },
  { entity: 'PharmacyConfig', permissions: { read: true } },
];

// Permissions for an Admin
export const adminPermissions: IPermission[] = [
  { entity: 'Dashboard', permissions: { read: true } },
  { entity: 'SaleOrder', permissions: { create: true, read: true, update: true, delete: true } },
  { entity: 'PharmacyProduct', permissions: { create: true, read: true, update: true, delete: true } },
  { entity: 'Patient', permissions: { create: true, read: true, update: true, delete: true } },
  { entity: 'Prescription', permissions: { create: true, read: true, update: true, delete: true, dispense: true } },
  { entity: 'Report', permissions: { read: true } },
  { entity: 'User', permissions: { create: true, read: true, update: true, delete: true } },
  { entity: 'Role', permissions: { create: true, read: true, update: true, delete: true } },
  { entity: 'PharmacyConfig', permissions: { read: true, update: true } },
];

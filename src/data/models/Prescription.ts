// src/data/models/Prescription.ts
// Define interfaces for Prescription-related data

export interface IPrescriptionDrugItem {
  drugId: string;
  drugName: string;
  quantity: number;
  dosage: string;
  instructions: string;
  isDispensed: boolean; // Flag to track if this specific item has been dispensed
  // TODO: Add more fields like strength, form, duration, refills, etc.
}

export interface IPrescription {
  id: string;
  patientId: string;
  patientName: string;
  prescribingDoctor: string;
  prescriptionDate: string; // ISO Date string
  expiryDate: string; // ISO Date string, when the prescription becomes invalid
  status: 'pending' | 'dispensed' | 'partial' | 'cancelled' | 'expired';
  drugItems: IPrescriptionDrugItem[];
  // TODO: Add more fields like clinic information, prescription image URL, notes, etc.
}

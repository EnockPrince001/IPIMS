// src/data/models/Patient.ts
// Define interfaces for Patient-related data

export interface IPatient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string; // ISO Date string
  contactNumber?: string;
  address?: string;
  medicalHistory?: string; // e.g., JSON string or array of conditions
  allergies?: string[]; // Array of allergy strings
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    // TODO: More insurance details
  };
  // TODO: Add fields like gender, email, etc.
}

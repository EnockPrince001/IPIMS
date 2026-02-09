// src/services/patientService.ts
// This service handles API calls related to patient management

import { patientClient } from '../config';
import { gql } from '@apollo/client';
import { IPatient } from '../data/models';

// TODO: Define your GraphQL queries and mutations for patients
const GET_PATIENTS_QUERY = gql`
  query GetPatients {
    patients {
      id
      firstName
      lastName
      contactNumber
      dateOfBirth
      // TODO: Add all fields you need
    }
  }
`;

const CREATE_PATIENT_MUTATION = gql`
  mutation CreatePatient($input: CreatePatientInput!) {
    createPatient(input: $input) {
      id
      firstName
      lastName
      // TODO: Add all fields you expect to get back
    }
  }
`;

class PatientService {
  public async getPatients(): Promise<IPatient[]> {
    // TODO: Implement fetching logic
    try {
      const { data } = await patientClient.query({
        query: GET_PATIENTS_QUERY,
        fetchPolicy: 'network-only',
      });
      return data.patients || [];
    } catch (error) {
      console.error('PatientService: Error fetching patients', error);
      throw error;
    }
  }

  public async createPatient(patient: Partial<IPatient>): Promise<IPatient> {
    // TODO: Implement creation logic
    try {
      const { data } = await patientClient.mutate({
        mutation: CREATE_PATIENT_MUTATION,
        variables: { input: patient },
      });
      return data.createPatient;
    } catch (error) {
      console.error('PatientService: Error creating patient', error);
      throw error;
    }
  }

  // TODO: Add update, delete, getById methods
}

export const patientService = new PatientService();

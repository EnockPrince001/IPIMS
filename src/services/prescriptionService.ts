// src/services/prescriptionService.ts
// This service handles API calls related to prescription management

import { prescriptionClient } from '../config';
import { gql } from '@apollo/client';
import { IPrescription } from '../data/models';

// TODO: Define your GraphQL queries and mutations for prescriptions
const GET_PRESCRIPTIONS_QUERY = gql`
  query GetPrescriptions($status: String) {
    prescriptions(status: $status) {
      id
      patientId
      patientName
      prescribingDoctor
      prescriptionDate
      expiryDate
      status
      drugItems {
        drugId
        drugName
        quantity
        dosage
        instructions
        isDispensed
      }
      // TODO: Add all fields you need
    }
  }
`;

const DISPENSE_PRESCRIPTION_MUTATION = gql`
  mutation DispensePrescription($id: ID!, $dispensedItems: [DispensedItemInput!]!) {
    dispensePrescription(id: $id, dispensedItems: $dispensedItems) {
      id
      status
      drugItems {
        drugId
        isDispensed
      }
      // TODO: Add all fields you expect to get back
    }
  }
`;

class PrescriptionService {
  public async getPrescriptions(status?: string): Promise<IPrescription[]> {
    // TODO: Implement fetching logic
    try {
      const { data } = await prescriptionClient.query({
        query: GET_PRESCRIPTIONS_QUERY,
        variables: { status },
        fetchPolicy: 'network-only',
      });
      return data.prescriptions || [];
    } catch (error) {
      console.error('PrescriptionService: Error fetching prescriptions', error);
      throw error;
    }
  }

  public async dispensePrescription(
    prescriptionId: string,
    dispensedItems: { drugId: string; quantity: number }[]
  ): Promise<IPrescription> {
    // TODO: Implement dispensing logic
    try {
      const { data } = await prescriptionClient.mutate({
        mutation: DISPENSE_PRESCRIPTION_MUTATION,
        variables: { id: prescriptionId, dispensedItems },
      });
      return data.dispensePrescription;
    } catch (error) {
      console.error('PrescriptionService: Error dispensing prescription', error);
      throw error;
    }
  }

  // TODO: Add create, update, delete, getById methods, and methods for managing refills
}

export const prescriptionService = new PrescriptionService();

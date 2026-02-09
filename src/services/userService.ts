// src/services/userService.ts
// This service handles API calls related to user management (beyond basic authentication)

import { userManagementClient } from '../config';
import { gql } from '@apollo/client';
import { IUser, IRole } from '../data/models';

// TODO: Define your GraphQL queries and mutations for users and roles
const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      username
      email
      roleId
      roleName
      // TODO: Add all fields you need
    }
  }
`;

const GET_ROLES_QUERY = gql`
  query GetRoles {
    roles {
      id
      name
      description
      // TODO: Add permission details if roles contain them directly
    }
  }
`;

class UserService {
  public async getUsers(): Promise<IUser[]> {
    // TODO: Implement fetching logic
    try {
      const { data } = await userManagementClient.query({
        query: GET_USERS_QUERY,
        fetchPolicy: 'network-only',
      });
      return data.users || [];
    } catch (error) {
      console.error('UserService: Error fetching users', error);
      throw error;
    }
  }

  public async getRoles(): Promise<IRole[]> {
    // TODO: Implement fetching logic
    try {
      const { data } = await userManagementClient.query({
        query: GET_ROLES_QUERY,
        fetchPolicy: 'network-only',
      });
      return data.roles || [];
    } catch (error) {
      console.error('UserService: Error fetching roles', error);
      throw error;
    }
  }

  // TODO: Add methods for creating, updating, deleting users, assigning roles, etc.
}

export const userService = new UserService();

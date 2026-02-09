// src/services/authService.ts
// This service handles authentication-related API calls (login, logout, refresh token)

import { IAuthTokens, IUser, IPermission } from '../data/models';
import { pharmacistPermissions } from '../data/mockData';

// This service is mocked for MVP purposes.
// It does not make real API calls but simulates an authentication flow.

const MOCK_PHARMACIST_USER: IUser = {
  id: 'user_001',
  username: 'pharmacist',
  email: 'pharmacist@ipims.com',
  roleId: 'role_pharma',
  roleName: 'Pharmacist',
};

class AuthService {
  private _user: IUser | null = null;

  public async login(username: string, password: string): Promise<IUser> {
    console.log('Simulating login for:', username);
    // For MVP, any login is successful and returns the mock pharmacist
    if (username && password) {
      localStorage.setItem('accessToken', 'mock-jwt-token');
      localStorage.setItem('tokenExpiration', (Date.now() + 3600 * 1000).toString()); // 1 hour expiry
      this._user = MOCK_PHARMACIST_USER;
      
      // Store mock permissions in local storage to be picked up by useAuth hook
      localStorage.setItem('userPermissions', JSON.stringify(pharmacistPermissions));
      
      return MOCK_PHARMACIST_USER;
    }
    throw new Error('Login failed: Invalid credentials');
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('userPermissions');
    this._user = null;
    console.log('User logged out.');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    const expiration = localStorage.getItem('tokenExpiration');
    if (!token || !expiration) return false;

    const currentTime = Date.now();
    return currentTime < parseInt(expiration, 10);
  }

  public async getAuthenticatedUser(): Promise<IUser | null> {
    if (this._user) return this._user;
    if (this.isAuthenticated()) {
      // In a real app, you'd fetch user details from API using the token.
      // Here, we just return the mock user.
      this._user = MOCK_PHARMACIST_USER;
      return this._user;
    }
    return null;
  }
}

export const authService = new AuthService();

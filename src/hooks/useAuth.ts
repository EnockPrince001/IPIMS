// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services';
import { AppDispatch } from '../store';
import { setUserRoles, setAbility } from '../store/reducers/rolesReducer';
import { defineAbilitiesFor } from '../data/RBAC/ability';
import { IUser, IPermission } from '../data/models';

interface AuthHook {
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

export const useAuth = (): AuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const setupAbilities = useCallback(() => {
    // For MVP, we get permissions directly from localStorage set by the mocked authService
    const rawPermissions: IPermission[] = JSON.parse(localStorage.getItem('userPermissions') || '[]');
    const userAbility = defineAbilitiesFor(rawPermissions);
    dispatch(setAbility(userAbility));
    dispatch(setUserRoles(rawPermissions));
    console.log('User abilities have been set up.');
  }, [dispatch]);

  const handleLogin = useCallback(async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const loggedInUser = await authService.login(username, password);
      setUser(loggedInUser);
      setIsAuthenticated(true);

      // After successful login, set up abilities based on mock permissions
      setupAbilities();

      return true;
    } catch (error) {
      console.error("Login failed in hook:", error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, [dispatch, setupAbilities]);

  const handleLogout = useCallback(async (): Promise<void> => {
    setLoading(true);
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    dispatch(setAbility(defineAbilitiesFor([]))); // Reset ability to guest
    dispatch(setUserRoles([]));
    navigate('/signin');
    setLoading(false);
  }, [dispatch, navigate]);

  const checkAuthStatus = useCallback(async () => {
    setLoading(true);
    try {
      const authenticatedUser = await authService.getAuthenticatedUser();
      if (authenticatedUser) {
        setUser(authenticatedUser);
        setIsAuthenticated(true);
        // On refresh or revisit, set up abilities again
        setupAbilities();
      } else {
        setIsAuthenticated(false);
        setUser(null);
        dispatch(setAbility(defineAbilitiesFor([]))); // Reset to guest
        dispatch(setUserRoles([]));
      }
    } catch (error) {
      console.error("Auth status check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      dispatch(setAbility(defineAbilitiesFor([])));
      dispatch(setUserRoles([]));
    } finally {
      setLoading(false);
    }
  }, [dispatch, setupAbilities]);

  useEffect(() => {
    // Initial check on component mount
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    isAuthenticated,
    user,
    loading,
    login: handleLogin,
    logout: handleLogout,
    checkAuthStatus,
  };
};

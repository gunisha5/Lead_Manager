import { useMutation } from '@tanstack/react-query';
import { login, register, LoginCredentials, RegisterCredentials } from './api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const { login: setAuth } = useAuth();

  return useMutation({
    mutationFn: (data: LoginCredentials) => login(data),
    onSuccess: (data) => {
      setAuth({ user: data.data.user, tokens: data.data.tokens });
      toast.success('Welcome back!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
};

export const useRegister = () => {
  const { login: setAuth } = useAuth();

  return useMutation({
    mutationFn: (data: RegisterCredentials) => register(data),
    onSuccess: (data) => {
      setAuth({ user: data.data.user, tokens: data.data.tokens });
      toast.success('Account created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });
};

export const usePermissions = () => {
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'admin';
  const isSales = user?.role === 'sales';

  return {
    canDeleteLead: isAdmin || isSales,
    canCreateLead: isAdmin || isSales,
    canEditLead: isAdmin || isSales,
    canViewLeads: isAdmin || isSales,
  };
};

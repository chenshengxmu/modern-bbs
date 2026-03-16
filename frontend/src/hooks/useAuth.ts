import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { login, register, logout as apiLogout } from '../api';
import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
  const { user, setAuth, logout: storeLogout } = useAuthStore();
  const [showLogin, setShowLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [authData, setAuthData] = useState({ username: '', email: '', password: '' });

  const authMutation = useMutation({
    mutationFn: (data: any) => isRegistering ? register(data) : login(data),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      setShowLogin(false);
      setIsRegistering(false);
      setAuthData({ username: '', email: '', password: '' });
      toast.success(isRegistering ? 'Account created! Welcome!' : `Welcome back, ${data.user.username}!`);
    },
    onError: (err: any) => {
      const msg = err.response?.data?.error || 'Authentication failed';
      toast.error(msg);
    }
  });

  const handleLogout = () => {
    apiLogout();
    storeLogout();
    toast.success('Logged out');
  };

  return {
    user,
    showLogin,
    setShowLogin,
    isRegistering,
    setIsRegistering,
    authData,
    setAuthData,
    authMutation,
    handleLogout
  };
};

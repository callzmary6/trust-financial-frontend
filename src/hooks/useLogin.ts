import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  login as apiLogin,
  LoginResponse,
} from '../services/apiAuth';
import { useAuth } from '../context/AuthContext';
import { LoginData } from '../types/SignupData';
import { useNavigate } from 'react-router';

interface UseLoginReturn {
  isLoggingIn: boolean;
  signin: (credentials: LoginData) => void;
  loginResponse?: LoginResponse;
  isSuccess: boolean;
}

export function useLogin(): UseLoginReturn {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: signin,
    isPending: isLoggingIn,
    data: loginResponse,
    isSuccess,
  }: UseMutationResult<LoginResponse, Error, LoginData> = useMutation<
    LoginResponse,
    Error,
    LoginData
  >({
    mutationFn: apiLogin,
    onSuccess: (data: LoginResponse) => {
      // Extract profile and token from the response and format as User
      const user = {
        user: data.data?.user,
        token: data?.token,
      };

      console.log('user from hook', user);
      login(user);
      toast.success('Logged in successfully');
      // navigate('/');
      console.log('Login successful:', data);
      navigate("/dashboard");
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Login failed');
    },
  });

  
  return { isLoggingIn, signin, loginResponse, isSuccess };
}

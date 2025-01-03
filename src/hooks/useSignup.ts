import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SignUpData } from '../types/SignupData';
import {signup as apiSignup, LoginResponse} from "../services/apiAuth";

interface UseSignupReturn {
  isSigningUp: boolean;
  signup: (formObject: SignUpData) => void;
  signupResponse?: LoginResponse;
  isSuccess: boolean;
}

export function useSignup(): UseSignupReturn {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending: isSigningUp,
    data: signupResponse,
    isSuccess,
  }: UseMutationResult<LoginResponse, Error, SignUpData> = useMutation<
    LoginResponse,
    Error,
    SignUpData
  >({
    mutationFn: apiSignup,
    onSuccess: (data: LoginResponse) => {
      const user = {
        user: data.data?.user,
        token: data?.data.token,
      };

      console.log('user from hook', user);

      login(user);

      toast.success('Signed up successfully');
      navigate('/app/dashboard');
      console.log('Signup successful:', data);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Signup failed');
    },
  });

  return { isSigningUp, signup, signupResponse, isSuccess };
}

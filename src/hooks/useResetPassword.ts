import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  resetPassword as apiResetPassword,
  ResetPassword,
  ResetPasswordResponse,
} from '../services/apiAuth';
import { useNavigate } from 'react-router';


interface UseResetPasswordReturn {
  isResetingPassword: boolean;
  resetPassword: (credentials: ResetPassword) => void;
  resetPasswordResponse?: ResetPasswordResponse;
  isSuccess: boolean;
}

export function useResetPassword(): UseResetPasswordReturn {
  const navigate = useNavigate();
  
  const {
    mutate: resetPassword,
    isPending: isResetingPassword,
    data: resetPasswordResponse,
    isSuccess,
  }: UseMutationResult<ResetPasswordResponse, Error, ResetPassword> = useMutation<
    ResetPasswordResponse,
    Error,
    ResetPassword
  >({
    mutationFn: apiResetPassword,
    onSuccess: (data: ResetPasswordResponse) => {
      toast.success('Password changed successfully');
      localStorage.removeItem("email");
      navigate("/login");
      console.log(data);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isResetingPassword, resetPassword, resetPasswordResponse, isSuccess };
}

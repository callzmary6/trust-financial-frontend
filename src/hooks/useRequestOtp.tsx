import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  requestOtp as apiRequestOtp,
  RequestOtpResponse,
} from '../services/apiAuth';
import { ForgotPasswordData } from '../types/SignupData';
import { useNavigate } from 'react-router';



interface UseForgotPasswordReturn {
  isSendingOtp: boolean;
  forgotPassword: (credentials: ForgotPasswordData) => void;
  RequestOtpResponse?: RequestOtpResponse;
  isSuccess: boolean;
}

export function useRequestOtp(): UseForgotPasswordReturn {

    const navigate = useNavigate();

  const {
    mutate: forgotPassword,
    isPending: isSendingOtp,
    data: RequestOtpResponse,
    isSuccess,
  }: UseMutationResult<RequestOtpResponse, Error, ForgotPasswordData> = useMutation<
    RequestOtpResponse,
    Error,
    ForgotPasswordData
  >({
    mutationFn: apiRequestOtp,
    onSuccess: (data: RequestOtpResponse) => {
      toast.success('OTP sent successfully');
      console.log(data);
      navigate("/forgot-password")
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isSendingOtp, forgotPassword, RequestOtpResponse, isSuccess };
}

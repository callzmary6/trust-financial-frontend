import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  forgotPasswordOtp as apiForgotPasswordOtp,
  RequestOtpResponse,
} from '../services/apiAuth';
import { OtpData } from '../types/SignupData';
import { useNavigate } from 'react-router';
// import { useAuthStore } from '../store/AuthStore';



interface UseOtpDataReturn {
  isVerifyingOtp: boolean;
  forgotPasswordOtp: (credentials: OtpData) => void;
  RequestOtpResponse?: RequestOtpResponse;
  isSuccess: boolean;
}

export function useForgotPassword(): UseOtpDataReturn {

  const navigate = useNavigate();

  // const setActiveAuthPage = useAuthStore((state) => state.setActiveAuthPage);

  const {
    mutate: forgotPasswordOtp,
    isPending: isVerifyingOtp,
    data: RequestOtpResponse,
    isSuccess,
  }: UseMutationResult<RequestOtpResponse, Error, OtpData> = useMutation<
    RequestOtpResponse,
    Error,
    OtpData
  >({
    mutationFn: apiForgotPasswordOtp,
    onSuccess: (data: RequestOtpResponse) => {
      toast.success('OTP Verification successfully');
      console.log(data);
      navigate("/change-password")
      // setActiveAuthPage("fPasswordForm");
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isVerifyingOtp, forgotPasswordOtp, RequestOtpResponse, isSuccess };
}

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  cryptoAddresses as apiCryptoAddress,
  CryptoAddressesResponse,
} from '../services/apiProfile';
import { CryptoAddresses } from '../types/ProfileData';
import { useNavigate } from 'react-router';


interface UseCryptoAddressReturn {
  isResetingPassword: boolean;
  cryptoAddress: (credentials: CryptoAddresses) => void;
  cryptoAddressesResponse?: CryptoAddressesResponse;
  isSuccess: boolean;
}

export function useCryptoAddress(): UseCryptoAddressReturn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: cryptoAddress,
    isPending: isResetingPassword,
    data: cryptoAddressesResponse,
    isSuccess,
  }: UseMutationResult<CryptoAddressesResponse, Error, CryptoAddresses> = useMutation<
    CryptoAddressesResponse,
    Error,
    CryptoAddresses
  >({
    mutationFn: apiCryptoAddress,
    onSuccess: (data: CryptoAddressesResponse) => {
      toast.success('Profile set successfully');
      queryClient.invalidateQueries({ queryKey: ["show-balance"] });
      console.log(data);
      navigate("/app/dashboard")
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isResetingPassword, cryptoAddress, cryptoAddressesResponse, isSuccess };
}

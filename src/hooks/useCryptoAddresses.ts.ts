import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  cryptoAddresses as apiCryptoAddress,
  CryptoAddressesResponse,
} from '../services/apiProfile';
import { CryptoAddresses } from '../types/ProfileData';
import { useNavigate } from 'react-router';
import useNavStore from '../store/NavStore';


interface UseCryptoAddressReturn {
  isChangingAddress: boolean;
  cryptoAddress: (credentials: CryptoAddresses) => void;
  cryptoAddressesResponse?: CryptoAddressesResponse;
  isSuccess: boolean;
}

export function useCryptoAddress(): UseCryptoAddressReturn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setActiveSideNav = useNavStore((state)=>state.setActiveSideNav);

  const {
    mutate: cryptoAddress,
    isPending: isChangingAddress,
    data: cryptoAddressesResponse,
    isSuccess,
  }: UseMutationResult<CryptoAddressesResponse, Error, CryptoAddresses> = useMutation<
    CryptoAddressesResponse,
    Error,
    CryptoAddresses
  >({
    mutationFn: apiCryptoAddress,
    onSuccess: () => {
      navigate("/app/dashboard")
      setActiveSideNav("dashboard")
      toast.success('Profile set successfully');
      queryClient.invalidateQueries({ queryKey: ["show-balance"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isChangingAddress, cryptoAddress, cryptoAddressesResponse, isSuccess };
}

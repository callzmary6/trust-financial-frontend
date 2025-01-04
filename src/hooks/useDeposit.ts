import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  deposit as apiDeposit,
  DepositResponse,
} from '../services/apiBalance';
import { DepositBody } from '../types/BalanceData';
import { useNavigate } from 'react-router';
import useNavStore from '../store/NavStore';


interface UseDepositDataReturn {
  isDepositing: boolean;
  deposit: (credentials: DepositBody) => void;
  depositResponse?: DepositResponse;
  isSuccess: boolean;
}

export function useDeposit(): UseDepositDataReturn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setActiveSideNav = useNavStore((state)=>state.setActiveSideNav);

  const {
    mutate: deposit,
    isPending: isDepositing,
    data: depositResponse,
    isSuccess,
  }: UseMutationResult<DepositResponse, Error, DepositBody> = useMutation<
    DepositResponse,
    Error,
    DepositBody
  >({
    mutationFn: apiDeposit,
    onSuccess: () => {
      navigate("/app/dashboard")
      setActiveSideNav("dashboard")
      queryClient.invalidateQueries({ queryKey: ["show-balance"] });
      toast.success('Deposit request sent. Wait a few minutes for balance to reflect on dashboard', { duration: 6000 });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isDepositing, deposit, depositResponse, isSuccess };
}

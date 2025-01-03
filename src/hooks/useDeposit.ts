import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  deposit as apiDeposit,
  DepositResponse,
} from '../services/apiBalance';
import { DepositBody } from '../types/BalanceData';


interface UseDepositDataReturn {
  isDepositing: boolean;
  deposit: (credentials: DepositBody) => void;
  depositResponse?: DepositResponse;
  isSuccess: boolean;
}

export function useDeposit(): UseDepositDataReturn {
  const queryClient = useQueryClient();
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
    onSuccess: (data: DepositResponse) => {
      toast.success('Deposit request sent. Wait a few minutes for balance to reflect on dashboard');
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["show-balance"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isDepositing, deposit, depositResponse, isSuccess };
}

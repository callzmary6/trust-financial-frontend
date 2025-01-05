import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  userWithdrawal as apiUserWithdrawal,
  UserWithdrawalResponse,
} from '../services/apiBalance';
import { WithdrawData } from '../types/BalanceData';
import { useNavigate } from 'react-router';
import useNavStore from '../store/NavStore';


interface UseWithdrawDataReturn {
isWithdrawing: boolean;
  withdraw: (credentials: WithdrawData) => void;
  userWithdrawalResponse?: UserWithdrawalResponse;
  isSuccess: boolean;
}

export function useUserWithdrawal(): UseWithdrawDataReturn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setActiveSideNav = useNavStore((state)=>state.setActiveSideNav);

  const {
    mutate: withdraw,
    isPending: isWithdrawing,
    data: userWithdrawalResponse,
    isSuccess,
  }: UseMutationResult<UserWithdrawalResponse, Error, WithdrawData> = useMutation<
    UserWithdrawalResponse,
    Error,
    WithdrawData
  >({
    mutationFn: apiUserWithdrawal,
    onSuccess: () => {
      navigate("/app/dashboard")
      setActiveSideNav("dashboard")
      queryClient.invalidateQueries({ queryKey: ["show-balance", "show-withdrawal", "earnings"] });
      toast.success('Withdrawal request sent. Wait a few minutes', { duration: 6000 });
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isWithdrawing, withdraw, userWithdrawalResponse, isSuccess };
}

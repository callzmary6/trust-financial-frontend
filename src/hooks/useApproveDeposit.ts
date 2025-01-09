import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ApproveWithdrawalResponse, approveDeposit as apiApproveDeposit } from '../services/apiAdmin';



interface UseApproveDepositReturn {
  isApprovingDeposit: boolean;
  approveDeposit: (credentials: string) => void;
  isSuccess: boolean;
}

export function useApproveDeposit(): UseApproveDepositReturn {
  const queryClient = useQueryClient();
  const {
    mutate: approveDeposit,
    isPending: isApprovingDeposit,
    isSuccess,
  }: UseMutationResult<ApproveWithdrawalResponse, Error, string> = useMutation<
    ApproveWithdrawalResponse,
    Error,
    string
  >({
    mutationFn: apiApproveDeposit,
    onSuccess: () => {
      toast.success('Approved');
      queryClient.invalidateQueries({ queryKey: ["admin-deposit"] })
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isApprovingDeposit, approveDeposit, isSuccess };
}

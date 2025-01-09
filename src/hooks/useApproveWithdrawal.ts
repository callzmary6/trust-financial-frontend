import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ApproveWithdrawalResponse, approveWithdrawal as apiApproveWithdrawal } from '../services/apiAdmin';



interface UseApproveWithdrawalReturn {
  isApprovingWithdrawal: boolean;
  approveWithdrawal: (credentials: string) => void;
  isSuccess: boolean;
}

export function useApproveWithdrawal(): UseApproveWithdrawalReturn {
const queryClient = useQueryClient();

  const {
    mutate: approveWithdrawal,
    isPending: isApprovingWithdrawal,
    isSuccess,
  }: UseMutationResult<ApproveWithdrawalResponse, Error, string> = useMutation<
    ApproveWithdrawalResponse,
    Error,
    string
  >({
    mutationFn: apiApproveWithdrawal,
    onSuccess: () => {
      toast.success('Approved');
      queryClient.invalidateQueries({ queryKey: ["admin-withdraw"] })
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isApprovingWithdrawal, approveWithdrawal, isSuccess };
}

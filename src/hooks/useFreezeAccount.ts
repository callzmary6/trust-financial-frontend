import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { FreezeUserResponse, freezeUser as apifreeze } from '../services/apiAccount';



interface UseFreezeAccountReturn {
  isFreezingAccount: boolean;
  freeze: (credentials: string) => void;
  isSuccess: boolean;
}


export function useFreezeAccount(): UseFreezeAccountReturn {
    const queryClient = useQueryClient();
  const {
    mutate: freeze,
    isPending: isFreezingAccount,
    isSuccess,
  }: UseMutationResult<FreezeUserResponse, Error, string> = useMutation<
    FreezeUserResponse,
    Error,
    string
  >({
    mutationFn: apifreeze,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
    },
  });

  return { isFreezingAccount, freeze, isSuccess };
}

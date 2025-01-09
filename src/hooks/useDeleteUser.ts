import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { DeleteUserResponse, deleteUser as apiDeleteUser } from '../services/apiAccount';



interface UseDeleteUserProps {
  isDeletingUser: boolean;
  deleteUser: (credentials: string) => void;
  isSuccess: boolean;
}

export function useDeleteUser(): UseDeleteUserProps {
    const queryClient = useQueryClient();
  const {
    mutate: deleteUser,
    isPending: isDeletingUser,
    isSuccess,
  }: UseMutationResult<DeleteUserResponse, Error, string> = useMutation<
    DeleteUserResponse,
    Error,
    string
  >({
    mutationFn: apiDeleteUser,
    onSuccess: () => {
      toast.success('User Deleted');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'failed');
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    },
  });

  return { isDeletingUser, deleteUser, isSuccess };
}

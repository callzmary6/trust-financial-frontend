import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { adminWithdrawal } from '../services/apiAdmin';

export function useAdminWithdraw() {
    const { user } = useAuth();
    const {
        data,
        isPending,
        error,
        isSuccess
    } = useQuery({
        queryKey: ["admin-withdraw"],
        queryFn: adminWithdrawal,
        enabled: !!user?.user._id,
    })

    return { data, isPending, error, isSuccess };
}
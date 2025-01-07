import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { adminDeposits } from '../services/apiAdmin';

export function useAdminDeposit() {
    const { user } = useAuth();
    const {
        data,
        isPending,
        error
    } = useQuery({
        queryKey: ["admin-deposit"],
        queryFn: adminDeposits,
        enabled: !!user?.user._id,
    })

    return { data, isPending, error };
}
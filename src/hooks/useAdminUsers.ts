import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { adminUsers } from '../services/apiAccount';

export function useAdminUsers() {
    const { user } = useAuth();
    const {
        data,
        isPending,
        error
    } = useQuery({
        queryKey: ["admin-users"],
        queryFn: adminUsers,
        enabled: !!user?.user._id,
    })

    return { data, isPending, error };
}
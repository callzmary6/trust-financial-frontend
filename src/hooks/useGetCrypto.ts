import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getCrypto } from '../services/apiProfile';

export function useGetCrypto() {
    const { user } = useAuth();
    const {
        data,
        isPending,
        error
    } = useQuery({
        queryKey: ["get-crypto", user?.user._id], // Add user ID to query key
        queryFn: getCrypto,
        enabled: !!user?.user._id, // Only run query when user ID exists
    })

    return { data, isPending, error };
}
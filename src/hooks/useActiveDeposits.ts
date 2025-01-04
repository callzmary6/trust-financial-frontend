import { useQuery } from "@tanstack/react-query";
import { activeDeposits } from "../services/apiBalance";

export function useActiveDeposits() {
    const {
        data,
        isPending,
        error
      } =  useQuery({
        queryKey: ["active-deposits"],
        queryFn: activeDeposits
    })

    

    return { data, isPending, error };
}
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../services/apiBalance";

export function useShowBalance() {
    const {
        data,
        isPending,
        error
      } =  useQuery({
        queryKey: ["show-balance"],
        queryFn: getBalance
    })

    

    return { data, isPending, error };
}
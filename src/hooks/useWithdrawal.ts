import { useQuery } from "@tanstack/react-query";
import { showWithdrawal } from "../services/apiBalance";


export function useShowWithdrawal() {
    const {
        data,
        isPending,
        error
      } =  useQuery({
        queryKey: ["show-withdrawal"],
        queryFn: showWithdrawal
    })

    

    return { data, isPending, error };
}
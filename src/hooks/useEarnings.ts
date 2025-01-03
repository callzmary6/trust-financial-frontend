import { useQuery } from "@tanstack/react-query";
import { getEarnings } from "../services/apiBalance";


export function useEarnings() {
    const {
        data,
        isPending,
        error
      } =  useQuery({
        queryKey: ["earnings"],
        queryFn: getEarnings
    })

    

    return { data, isPending, error };
}
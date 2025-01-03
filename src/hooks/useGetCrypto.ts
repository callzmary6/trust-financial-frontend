import { useQuery } from "@tanstack/react-query";
import { getCrypto } from "../services/apiProfile";


export function useGetCrypto() {
    const {
        data,
        isPending,
        error
      } =  useQuery({
        queryKey: ["get-crypto"],
        queryFn: getCrypto
    })

    

    return { data, isPending, error };
}
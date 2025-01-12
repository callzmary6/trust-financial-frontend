import { useEffect, useState } from "react";
import "../styles/components/CryptoTable.scss";
import { formatMoney } from "../utils/moneyUtils";
import { CryptoData, fetchCryptoData } from "../services/apiCrypto";

interface TokenDetailsProps {
    token: CryptoData
}

function TokenDetails({token}: TokenDetailsProps) {
    

    return (
        <>
            {/* <div className="crypto_table_header"> */}
                <div className="crypto_table_header_token">{token.name}</div>
                <div className="crypto_table_header_price">{formatMoney(token.current_price)}</div>
            {/* </div> */}
        </>
    )
};

function CryptoTable() {
    const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
    
      useEffect(() => {
        const getData = async () => {
          const data = await fetchCryptoData();
          setCryptoData(data);
        };
        getData();
      }, []);

    return (
        <div className="crypto_table">
            <div className="crypto_table_header">
                <div className="crypto_table_header_token_main">Token</div>
                <div className="crypto_table_header_price_main">Price</div>
                {cryptoData.map((token)=>(<TokenDetails token={token} key={token.name}/>))}
            </div>
        </div>
    )
}

export default CryptoTable;
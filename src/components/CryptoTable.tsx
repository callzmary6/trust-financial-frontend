import "../styles/components/CryptoTable.scss";
import { formatMoney } from "../utils/moneyUtils";

const tokenDetails = [
    {name: "Bitcoin", price: 99000},
    {name: "Ethereum", price: 3400},
    {name: "Solana", price: 200},
    {name: "Ton", price: 5},
];

interface TokenDetailsProps {
    token: {name: string, price: number};
}

function TokenDetails({token}: TokenDetailsProps) {
    return (
        <>
            {/* <div className="crypto_table_header"> */}
                <div className="crypto_table_header_token">{token.name}</div>
                <div className="crypto_table_header_price">{formatMoney(token.price)}</div>
            {/* </div> */}
        </>
    )
};

function CryptoTable() {
    return (
        <div className="crypto_table">
            <div className="crypto_table_header">
                <div className="crypto_table_header_token_main">Token</div>
                <div className="crypto_table_header_price_main">Price</div>
                {tokenDetails.map((token)=>(<TokenDetails token={token} key={token.name}/>))}
            </div>
        </div>
    )
}

export default CryptoTable;
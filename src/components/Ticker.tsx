import React, { useEffect, useState } from 'react';
import { fetchCryptoData, CryptoData } from '../services/apiCrypto';
import styles from '../styles/components/Ticker.module.scss';
import { formatMoney } from '../utils/moneyUtils';

const Ticker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData();
      setCryptoData(data);
    };
    getData();
  }, []);

  console.log(cryptoData)

  if(false) return (
    <div className={styles.ticker_container}>
      <div className={styles.ticker}>
        {cryptoData.map(crypto => (
          <div key={crypto.id} className={styles.ticker_item}>
            <img src={crypto.image} alt={crypto.symbol} className={styles.crypto_image}/>
            <div>{crypto.symbol.toUpperCase()} {crypto.price_change_percentage_24h.toFixed(2)}%</div>
            <div>{crypto.current_price}</div>
          </div>
        ))}
      </div>
    </div>
  );
  if (true) return (
    <div className={styles.tickerContainer}>
        {cryptoData.map((crypto)=> 
        <div key={crypto.id} className={styles.tickerItem}>
            <img src={crypto.image} alt="" className={styles.tickerItem_image}/>
            <div className={styles.tickerItem_name}>{crypto.name}</div>
            <div className={styles.tickerItem_symbol}>({crypto.symbol.toUpperCase()})</div>
            <div className={`${crypto.price_change_percentage_24h>=0? styles.tickerItem_price: styles.tickerItem_negative}`}>{formatMoney(crypto.current_price)}</div>
            <div className={`${crypto.price_change_percentage_24h>=0? styles.tickerItem_price: styles.tickerItem_negative}`}>({crypto.price_change_percentage_24h.toFixed(2)}%)</div>
        </div>)}
    </div>
  )
};

export default Ticker;

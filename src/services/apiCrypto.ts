import axios from 'axios';

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  const response = await axios.get<CryptoData[]>('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: false,
      price_change_percentage: '24h'
    }
  });
  return response.data;
};
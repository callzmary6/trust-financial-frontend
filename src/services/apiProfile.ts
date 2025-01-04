import { CryptoAddresses } from "../types/ProfileData";
import { getAccessToken, handleAuthError, isTokenExpired } from "../utils/authUtils";

const API_URL = 'https://trust-financials-backend.onrender.com/api/v1';

export interface CryptoAddressesResponse {
    success: boolean;
    code: number;
    msg: string;
}


interface GetCryptoResponse{
    success: boolean;
    code: number;
    msg: string;
    data: {
      userProfile: {
        bitcoinAddress: string;
        bitcoinCashAddress: string;
        ethereumAddress: string;
        usdtERCAddress: string;
        usdtTRCAddress: string;
      }
    }
  };


export async function cryptoAddresses(requestBody: CryptoAddresses): Promise<CryptoAddressesResponse> {
    const token = getAccessToken();

    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
      }

    try {
      const res = await fetch(`${API_URL}/auth/update-profile`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: CryptoAddressesResponse = await res.json();
        throw new Error(errorResponse.msg || 'fetching crypto address failed');
      }
  
      const response: CryptoAddressesResponse = await res.json();
      console.log('Crypto address response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('fetching crypto address failed: ' + error.message);
      }
  
      throw new Error('fetching crypto address failed: Unknown error occurred');
    }
  }



  export async function getCrypto(): Promise<GetCryptoResponse> {
    const token = getAccessToken();

    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
      }

    try {
      const res = await fetch(`${API_URL}/auth/get-profile`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: GetCryptoResponse = await res.json();
        throw new Error(errorResponse.msg || 'Error fetching crypto');
      }
  
      const response: GetCryptoResponse = await res.json();
      console.log('crypto response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to get crypto: ' + error.message);
      }
  
      throw new Error('Failed to get crypto: Unknown error occurred');
    }
  }
import { DepositBody } from "../types/BalanceData";
import { getAccessToken, handleAuthError, isTokenExpired } from "../utils/authUtils";

const API_URL = 'https://trust-financials-backend.onrender.com/api/v1';

export interface BalanceResponse {
    success: boolean;
    code: number;
    msg: string;
    data: {
        userBalance: number;
    }
}

export interface EarningsResponse {
    success: boolean;
    code: number;
    msg: string;
    data: {
        totalEarnings: number;
    }
}

export interface WithdrawalResponse {
    success: boolean;
    code: number;
    msg: string;
    data: {
        totalWithdrawals: number;
    }
}

export interface ActiveDepositsResponse {
  success: boolean;
  code: number;
  msg: string;
  data: {
      activeDeposits: number;
  }
}

export interface DepositResponse {
    success: boolean;
    code: number;
    msg: string;
}


export async function getBalance(): Promise<BalanceResponse> {
    const token = getAccessToken();

    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
      }

    try {
      const res = await fetch(`${API_URL}/auth/show-balance`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: BalanceResponse = await res.json();
        throw new Error(errorResponse.msg || 'Error fetching balance');
      }
  
      const response: BalanceResponse = await res.json();
      console.log('Balance response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to get balannce: ' + error.message);
      }
  
      throw new Error('Failed to get balance: Unknown error occurred');
    }
  }



  export async function deposit(requestBody: DepositBody): Promise<DepositResponse> {

    const token = getAccessToken();

    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
      }

    try {
      const res = await fetch(`${API_URL}/investment/deposit-funds`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: DepositResponse = await res.json();
        throw new Error(errorResponse.msg || 'Deposit failed');
      }
  
      const response: DepositResponse = await res.json();
      console.log('Login response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to deposit: ' + error.message);
      }
  
      throw new Error('Failed to deposit: Unknown error occurred');
    }
  }
  
  

  export async function getEarnings(): Promise<EarningsResponse> {

    const token = getAccessToken();

    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
      }

    try {
      const res = await fetch(`${API_URL}/investment/total-earnings`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: EarningsResponse = await res.json();
        throw new Error(errorResponse.msg || 'Get earnings failed');
      }
  
      const response: EarningsResponse = await res.json();
      console.log('Get earnings response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to get earnings: ' + error.message);
      }
  
      throw new Error('Failed to get earnings: Unknown error occurred');
    }
  }





  export async function showWithdrawal(): Promise<WithdrawalResponse> {

    const token = getAccessToken();

    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
      }

    try {
      const res = await fetch(`${API_URL}/investment/total-withdrawals`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: WithdrawalResponse = await res.json();
        throw new Error(errorResponse.msg || 'withdraw failed');
      }
  
      const response: WithdrawalResponse = await res.json();
      console.log('withdraw response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to withdraw: ' + error.message);
      }
  
      throw new Error('Failed to withdraw: Unknown error occurred');
    }
  }


  export async function activeDeposits(): Promise<ActiveDepositsResponse> {

    const token = getAccessToken();

    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
      }

    try {
      const res = await fetch(`${API_URL}/investment/active-deposits`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: ActiveDepositsResponse = await res.json();
        throw new Error(errorResponse.msg || 'deposit failed');
      }
  
      const response: ActiveDepositsResponse = await res.json();
      console.log('deposit response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to deposit: ' + error.message);
      }
  
      throw new Error('Failed to deposit: Unknown error occurred');
    }
  }

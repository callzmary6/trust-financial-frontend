import { getAccessToken, handleAuthError, isTokenExpired } from "../utils/authUtils";

const API_URL = 'https://trust-financials-backend.onrender.com/api/v1';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Deposit {
  _id: string;
  user: User;
  amount: number;
  investmentPlan: string;
  paymentMethod: string;
  payerAddress: string;
  transactionId: string;
  isPending: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AdminDepositResponse {
  success: boolean;
  code: number;
  msg: string;
  data: Deposit[];
}


export interface Withdrawal {
  _id: string;
  user: User;
  walletAddress: string;
  amount: number;
  withdrawalMethod: string;
  isPending: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AdminWithdrawalResponse {
  success: boolean;
  code: number;
  msg: string;
  data: Withdrawal[];
}

export type AdminWithdrawResponse = Withdrawal[];

export interface ApproveWithdrawalResponse {
  success: boolean;
  code: number;
  msg: string;
}


  

export async function adminDeposits(): Promise<AdminDepositResponse> {
    const token = getAccessToken();

    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
      }

    try {
      const res = await fetch(`${API_URL}/admin/deposits`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: AdminDepositResponse = await res.json();
        throw new Error(errorResponse.msg || 'deposit failed');
      }
  
      const response: AdminDepositResponse = await res.json();
      console.log('deposit response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to deposit: ' + error.message);
      }
  
      throw new Error('Failed to deposit: Unknown error occurred');
    }
}


export async function adminWithdrawal(): Promise<AdminWithdrawResponse> {
    const token = getAccessToken();

    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
      }

    try {
      const res = await fetch(`${API_URL}/admin/withdrawals`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: AdminWithdrawalResponse = await res.json();
        throw new Error(errorResponse.msg || 'withdrawal failed');
      }
  
      const response: AdminWithdrawalResponse = await res.json();
      console.log('withdrawal response:', response);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to withdrawal: ' + error.message);
      }
  
      throw new Error('Failed to withdrawal: Unknown error occurred');
    }
}


export async function approveWithdrawal(id: string): Promise<ApproveWithdrawalResponse> {
  const token = getAccessToken();

  if (isTokenExpired(token)) {
      handleAuthError();
      throw new Error('Session expired');
  }

  try {
    const res = await fetch(`${API_URL}/admin/approve-withdrawal/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!res.ok) {
      const errorResponse: ApproveWithdrawalResponse = await res.json();
      throw new Error(errorResponse.msg || 'withdrawal failed');
    }

    const response: ApproveWithdrawalResponse = await res.json();
    console.log('withdrawal response:', response);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to withdraw: ' + error.message);
    }

    throw new Error('Failed to withdrawal: Unknown error occurred');
  }
}



export async function approveDeposit(id: string): Promise<ApproveWithdrawalResponse> {
  const token = getAccessToken();

  if (isTokenExpired(token)) {
      handleAuthError();
      throw new Error('Session expired');
  }

  try {
    const res = await fetch(`${API_URL}/admin/approve-deposit/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!res.ok) {
      const errorResponse: ApproveWithdrawalResponse = await res.json();
      throw new Error(errorResponse.msg || 'withdrawal failed');
    }

    const response: ApproveWithdrawalResponse = await res.json();
    console.log('withdrawal response:', response);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to withdraw: ' + error.message);
    }

    throw new Error('Failed to withdrawal: Unknown error occurred');
  }
}


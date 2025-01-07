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
  
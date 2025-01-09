import { getAccessToken, handleAuthError, isTokenExpired } from "../utils/authUtils";

const API_URL = 'https://trust-financials-backend.onrender.com/api/v1';

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    referralCode: string;
    __v: number;
    balance: number;
    referralCount: number;
    isSuspended: boolean;
    address?: string;  // Optional property
    phoneNumber?: string;  // Optional property
    profilePicture?: string;  // Optional property
    bitcoinAddress?: string;  // Optional property
    bitcoinCashAddress?: string;  // Optional property
    ethereumAddress?: string;  // Optional property
    usdtERCAddress?: string;  // Optional property
    usdtTRCAddress?: string;  // Optional property
}
  
interface AdminUsersResponse {
    success: boolean;
    code: number;
    msg: string;
    data: {
        users: User[];
    };
}

export type UserResponse = User[];

export interface FreezeUserResponse {
    success: boolean;
    code: number;
    msg: string;
}

export interface DeleteUserResponse {
    success: boolean;
    code: number;
    msg: string;
}



export async function adminUsers(): Promise<UserResponse> {
    const token = getAccessToken();

    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
      }

    try {
      const res = await fetch(`${API_URL}/admin/accounts/users`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: AdminUsersResponse = await res.json();
        throw new Error(errorResponse.msg || 'withdrawal failed');
      }
  
      const response: AdminUsersResponse = await res.json();
      console.log('withdrawal response:', response);
      return response.data.users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to withdrawal: ' + error.message);
      }
  
      throw new Error('Failed to withdrawal: Unknown error occurred');
    }
}



export async function freezeUser(id: string): Promise<FreezeUserResponse> {
  const token = getAccessToken();

  if (isTokenExpired(token)) {
      handleAuthError();
      throw new Error('Session expired');
  }

  try {
    const res = await fetch(`${API_URL}/admin/accounts/freeze-user/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!res.ok) {
      const errorResponse: FreezeUserResponse = await res.json();
      throw new Error(errorResponse.msg || 'freeze failed');
    }

    const response: FreezeUserResponse = await res.json();
    console.log('freeze response:', response);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('freeze to withdraw: ' + error.message);
    }

    throw new Error('freeze to withdrawal: Unknown error occurred');
  }
}


export async function deleteUser(id: string): Promise<DeleteUserResponse> {
    const token = getAccessToken();
  
    if (isTokenExpired(token)) {
        handleAuthError();
        throw new Error('Session expired');
    }
  
    try {
      const res = await fetch(`${API_URL}/admin/accounts/delete-user/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
  
      if (!res.ok) {
        const errorResponse: DeleteUserResponse = await res.json();
        throw new Error(errorResponse?.msg || 'freeze failed');
      }
  
      const response: DeleteUserResponse = await res.json();
      console.log('freeze response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('freeze to withdraw: ' + error.message);
      }
  
      throw new Error('freeze to withdrawal: Unknown error occurred');
    }
  }

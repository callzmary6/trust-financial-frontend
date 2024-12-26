import { ForgotPasswordData, LoginData, OtpData, SignUpData } from "../types/SignupData";

const API_URL = 'https://trust-financials-backend.onrender.com/api/v1';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  refferalCode: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    user: User;
  };
  token: string;
}

export interface RequestOtpResponse {
  success: boolean;
  message: string;
  code: number;
}


export interface ResetPassword {
  newPassword: string;
  email: string | undefined | unknown;
}


export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  code: number;
}

export async function signup(
    formObject: SignUpData,
  ): Promise<LoginResponse> {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            firstName: formObject.firstName,
            lastName: formObject.lastName,
            email: formObject.email,
            password: formObject.password,
            refferalCode: formObject.refferalCode,
          }),
        headers: {
          'Content-type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message || 'Failed to complete registration',
        );
      }
      const response: LoginResponse = await res.json();
      console.log('successful', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to complete registration: ' + error.message);
      }
      throw new Error('Failed to complete registration: Unknown error occurred');
    }
  }



  export async function login(requestBody: LoginData): Promise<LoginResponse> {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const errorResponse: LoginResponse = await res.json();
        throw new Error(errorResponse.message || 'Login failed');
      }
  
      const response: LoginResponse = await res.json();
      console.log('Login response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to login: ' + error.message);
      }
  
      throw new Error('Failed to login: Unknown error occurred');
    }
  }



  export async function requestOtp(requestBody: ForgotPasswordData): Promise<RequestOtpResponse> {

    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const errorResponse: RequestOtpResponse = await res.json();
        throw new Error(errorResponse.message || 'Could not send OTP');
      }
  
      const response: RequestOtpResponse = await res.json();
      console.log('Forgot response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Could not send OTP: ' + error.message);
      }
  
      throw new Error('Could not send OTP: Unknown error occurred');
    }
  }



  export async function forgotPasswordOtp(requestBody: OtpData): Promise<RequestOtpResponse> {

    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const errorResponse: RequestOtpResponse = await res.json();
        throw new Error(errorResponse.message || 'Could not verify OTP');
      }
  
      const response: RequestOtpResponse = await res.json();
      console.log('ForgotOtp response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('OTP incorrect or expired: ' + error.message);
      }
  
      throw new Error('OTP incorrect or expired: Unknown error occurred');
    }
  }



  export async function resetPassword(requestBody: ResetPassword): Promise<ResetPasswordResponse> {

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const errorResponse: ResetPasswordResponse = await res.json();
        throw new Error(errorResponse.message || 'Could not reset password');
      }
  
      const response: ResetPasswordResponse = await res.json();
      console.log('reset response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Could not reset password: ' + error.message);
      }
  
      throw new Error('Could not reset password: Unknown error occurred');
    }
  }
  
  
import Cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import toast from 'react-hot-toast';

const ACCESS_TOKEN_KEY = 'accessToken';

interface DecodedToken extends JwtPayload {
  exp: number;
}

export function isTokenExpired(token: string | undefined): boolean {
  if (!token) return true;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    expires: 3,
    secure: true,
    sameSite: 'strict',
  });
}

export function clearAuthData(): void {
  Cookies.remove(ACCESS_TOKEN_KEY);
}

export function handleAuthError(): void {
  clearAuthData();
  toast.error('Session expired. Please login again.');
}

export function logTokenInfo(): void {
  const token = getAccessToken();

  if (!token) {
    console.log('No token found');
    return;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const exp = decoded.exp;
    const expDate = new Date(exp * 1000);
    const now = new Date();

    console.log('Token expiration:', expDate.toISOString());
    console.log('Current time:', now.toISOString());
    console.log(
      'Time until expiration:',
      (exp * 1000 - Date.now()) / 1000 / 60,
      'minutes',
    );
    console.log('Is token expired:', isTokenExpired(token));
  } catch (error) {
    console.error('Error decoding token:', error);
  }
}


// Generate referral link
export const generateReferralLink = (refCode: string) => {
  const baseUrl = window.location.origin; // Gets your website's base URL
  return `${baseUrl}/signup?ref=${encodeURIComponent(refCode)}`;
};
// src/utils/storage.ts

// Type for storage items with expiry
interface StorageItem<T> {
    value: T;
    expiry?: number;
    createdAt: number;
  }
  
  export class StorageUtil {
    private static instance: StorageUtil;
  
    private constructor() {}
  
    static getInstance(): StorageUtil {
      if (!StorageUtil.instance) {
        StorageUtil.instance = new StorageUtil();
      }
      return StorageUtil.instance;
    }
  
    /**
     * Set item in localStorage with optional expiry
     * @param key Storage key
     * @param value Value to store
     * @param expiryHours Number of hours until the item expires (optional)
     */
    setItem<T>(key: string, value: T, expiryHours?: number): void {
      try {
        const item: StorageItem<T> = {
          value,
          createdAt: new Date().getTime(),
          expiry: expiryHours ? new Date().getTime() + (expiryHours * 60 * 60 * 1000) : undefined
        };
        localStorage.setItem(key, JSON.stringify(item));
      } catch (error) {
        console.error(`Error setting item ${key} in localStorage:`, error);
      }
    }
  
    /**
     * Get item from localStorage
     * @param key Storage key
     * @returns The stored value or null if not found/expired
     */
    getItem<T>(key: string): T | null {
      try {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
  
        const item: StorageItem<T> = JSON.parse(itemStr);
        
        // Check if item has expired
        if (item.expiry && new Date().getTime() > item.expiry) {
          localStorage.removeItem(key);
          return null;
        }
  
        return item.value;
      } catch (error) {
        console.error(`Error getting item ${key} from localStorage:`, error);
        return null;
      }
    }
  
    /**
     * Remove item from localStorage
     * @param key Storage key
     */
    removeItem(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item ${key} from localStorage:`, error);
      }
    }
  
    /**
     * Clear all items from localStorage
     */
    clear(): void {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  
    /**
     * Get all keys in localStorage
     * @returns Array of storage keys
     */
    getAllKeys(): string[] {
      return Object.keys(localStorage);
    }
  }
  
  // Export a default instance
  export const storage = StorageUtil.getInstance();




  /**
   * 
   * 
   * // In your components/pages

import { storage } from '@/utils/storage';

// Store an item
storage.setItem('user', { name: 'John', age: 30 });

// Store with expiry (24 hours)
storage.setItem('sessionToken', 'abc123', 24);

// Get an item
const user = storage.getItem<{ name: string; age: number }>('user');
if (user) {
  console.log(user.name); // Type-safe access
}

// Remove an item
storage.removeItem('user');

// Clear all storage
storage.clear();

// Get all keys
const allKeys = storage.getAllKeys();
   */




export const splitName = (fullName: string): { firstName: string; lastName: string } => {
    // Split the name by space and filter out any empty strings
    const nameParts = fullName.trim().split(/\s+/).filter(Boolean);
    
    // If there's only one part, use it as firstName and empty string as lastName
    if (nameParts.length === 1) {
      return {
        firstName: nameParts[0],
        lastName: ''
      };
    }
    
    // Get the first name (first part)
    const firstName = nameParts[0];
    
    // Get the last name (remaining parts joined together)
    const lastName = nameParts.slice(1).join(' ');
    
    return {
      firstName,
      lastName
    };
  };




// Function to format phone number by removing +234 prefix
export const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove +234 and replace with 0
    if (phoneNumber.startsWith('+234')) {
      return '0' + phoneNumber.slice(4);
    }
    
    // Return original number if it doesn't start with +234
    return phoneNumber;
  };
  
  // Example usage:
//   const phone = '+2349168730140';
//   const formattedPhone = formatPhoneNumber(phone);
//   console.log(formattedPhone); // Output: "09168730140"



//To get Array form storage

export const getArrayFromStorage = (key: string) => {
    try {
      const data = localStorage.getItem(key);
      if (!data) return null;

      
      const parsedData = JSON.parse(data).value;
      
      console.log(parsedData);
      // Check if the parsed data is an array
      if (!Array.isArray(parsedData)) {
        console.log('Data is not an array');
        return null;
      }
  
      // Get first two objects if array has enough items
      const firstTwo = parsedData.slice(0, 2);

      console.log(firstTwo);
      return parsedData;
  
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return null;
    }
  };
  

  export const getAirportIdFromAbbreviation = (abbreviation: string, airports: any): string | undefined => {
    const airport = airports.find((airport: any) => airport.abbreviation === abbreviation);
    return airport?._id;
  };


  export const getAirportName = (abbreviation: string, airports: any): string | undefined => {
    const airport = airports.find((airport: any) => airport.abbreviation === abbreviation);
    return airport?.name;
  };


  export const getAirportCity = (abbreviation: string, airports: any): string | undefined => {
    const airport = airports.find((airport: any) => airport.abbreviation === abbreviation);
    return airport?.city;
  };

  export const getCountryCode = (abbreviation: string, airports: any): string | undefined => {
    const airport = airports.find((airport: any) => airport.abbreviation === abbreviation);
    return airport?.country_code;
  };
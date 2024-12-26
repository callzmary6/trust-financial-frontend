// src/types/fleet.types.ts
export interface Aircraft {
    aircraftId: string;
    name: string;
    image: string;
  }
  
  export interface Operator {
    name: string;
    email: string;
    phone: string;
  }
  
  export interface Route {
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    _id: string;
  }
  
  export interface Fleet {
    _id: string;
    aircraft: Aircraft;
    operator: Operator;
    aircraftSize: string;
    aircraftImages: string[];
    tailNumber: string;
    capacity: number;
    isAvailable: boolean;
    availableFrom: string;
    availableTo: string;
    amenities: string[];
    pricing?: number;
    routes: Route[];
    notes?: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
  }
  
  export interface FleetCardsProps {
    card: Fleet;
    isSelected: boolean;
    onSelect: () => void;
  }

  export interface FleetResponse {
    data: {
      docs: Fleet[];
    };
    success: boolean;
    message: string;
    code: number;
  }
  
  export interface UseGetFleetReturn {
    data: FleetResponse | undefined;
    isPending: boolean;
    error: Error | null;
  }



  
// types/flight.ts
export interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Leg {
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalDate?: string;
  arrivalTime?: string;
  passengerCount: number;
}

export interface FlightRequest {
  // type: 'empty_leg';
  type: string;
  legs: Leg[];
  jetSize: 'mid' | 'heavy' | 'light';
  flightPreference: 'cheapest' | string;
  contactDetails: ContactDetails;
  fleetIds: string[];
}
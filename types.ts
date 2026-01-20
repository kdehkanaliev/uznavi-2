
export enum BudgetTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD'
}

export enum TripType {
  SOLO = 'Solo',
  COUPLE = 'Couple',
  FAMILY = 'Family',
  GROUP = 'Group'
}

export enum Pace {
  RELAXED = 'relaxed',
  MODERATE = 'moderate',
  ACTIVE = 'active'
}

export interface Review {
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Place {
  id: string;
  name: string;
  category: 'Historical' | 'Market' | 'Museum' | 'Restaurant' | 'Hotel' | 'Park';
  description: string;
  image: string;
  lat: number;
  lng: number;
  price_range: string;
  phone: string;
  opening_hours: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export interface ItineraryStop {
  placeId?: string;
  placeName: string;
  time: string;
  activity: string;
  description?: string;
  transport?: string;
}

export interface DayPlan {
  day: number;
  stops: ItineraryStop[];
}

export interface Trip {
  id: string;
  userId: string;
  daysCount: number;
  budgetTier: BudgetTier;
  tripType: TripType;
  pace: Pace;
  itinerary: DayPlan[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  currencyPref: 'USD' | 'UZS';
}

export interface Guide {
  id: string;
  name: string;
  languages: string[];
  hourly_rate: number;
  experience_years: number;
  contact: string;
  image: string;
  specialties: string[];
}

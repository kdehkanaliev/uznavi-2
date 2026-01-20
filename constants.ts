
import { Place, Guide } from './types';

export const COLORS = {
  primary: '#0ea5e9',
  secondary: '#f59e0b',
  accent: '#10b981',
  background: '#f8fafc',
  card: '#ffffff'
};

const MOCK_REVIEWS = [
  { userName: "John D.", rating: 5, comment: "Absolutely breathtaking! A must-see in Samarkand.", date: "2 days ago" },
  { userName: "Elena S.", rating: 4, comment: "Beautiful architecture, but very crowded in the afternoon.", date: "1 week ago" }
];

export const MOCK_PLACES: Place[] = [
  {
    id: '1',
    name: 'Registan Square',
    category: 'Historical',
    description: 'The heart of ancient Samarkand, featuring three majestic madrasahs.',
    image: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&q=80&w=800',
    lat: 39.6547,
    lng: 66.9758,
    price_range: '$5',
    phone: '+998 66 123 45 67',
    opening_hours: '08:00 - 20:00',
    tags: ['photography', 'history', 'architecture'],
    rating: 4.9,
    reviewCount: 1240,
    reviews: MOCK_REVIEWS
  },
  {
    id: '2',
    name: 'Chorsu Bazaar',
    category: 'Market',
    description: 'The iconic traditional market in the old city of Tashkent.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
    lat: 41.3267,
    lng: 69.2355,
    price_range: 'Free',
    phone: 'N/A',
    opening_hours: '05:00 - 19:00',
    tags: ['food', 'shopping', 'culture'],
    rating: 4.7,
    reviewCount: 850,
    reviews: MOCK_REVIEWS
  },
  {
    id: '3',
    name: 'Amir Temur Museum',
    category: 'Museum',
    description: 'A museum dedicated to the life and reign of the great conqueror Timur.',
    image: 'https://images.unsplash.com/photo-1589519160732-57fc498494f8?auto=format&fit=crop&q=80&w=800',
    lat: 41.3131,
    lng: 69.2796,
    price_range: '$3',
    phone: '+998 71 232 02 12',
    opening_hours: '10:00 - 17:00',
    tags: ['history', 'art', 'museum'],
    rating: 4.5,
    reviewCount: 420,
    reviews: MOCK_REVIEWS
  },
  {
    id: '4',
    name: 'Plov Center',
    category: 'Restaurant',
    description: 'The best place to try traditional Uzbek Plov cooked in massive cauldrons.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    lat: 41.3364,
    lng: 69.2841,
    price_range: '$4-8',
    phone: '+998 71 234 56 78',
    opening_hours: '11:00 - 15:00',
    tags: ['food', 'pork-free', 'traditional'],
    rating: 4.8,
    reviewCount: 2100,
    reviews: MOCK_REVIEWS
  }
];

export const MOCK_GUIDES: Guide[] = [
  {
    id: 'g1',
    name: 'Dilshod Ahmedov',
    languages: ['English', 'Russian', 'Uzbek'],
    hourly_rate: 25,
    experience_years: 12,
    contact: '+998 90 123 45 67',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    specialties: ['History', 'Gastronomy']
  }
];

export const INTERESTS = [
  'Art & Photography', 'Museums', 'Nature & Parks', 'Kids Activities', 'Games & Entertainment', 'Food & Gastronomy'
];

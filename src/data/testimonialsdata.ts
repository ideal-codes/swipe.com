import { TestimonialItem, LocationItem } from '../types';
import arjunAvatar from '../../assets/life/arjun.jpg';
import naveedAvatar from '../../assets/life/naveed.jpg';
import athuldevAvatar from '../../assets/life/athuldev.jpg';

export const LIFE_AT_SWIPE: TestimonialItem[] = [
  {
    id: 'life-1',
    clientName: 'Arjun',
    clientRole: 'Founder',
    company: 'SWIPE',
    companyLogoText: 'SWIPE',
    avatarUrl: arjunAvatar,
    content:
      'We started SWIPE as students with a simple belief: if we could build with real discipline, we could ship work that feels bigger than our age. That energy is still the core of everything here.',
    rating: 5,
    projectRef: 'LIFE-FOUNDER',
  },
  {
    id: 'life-2',
    clientName: 'Naveed',
    clientRole: 'Co-Founder',
    company: 'SWIPE',
    companyLogoText: 'SWIPE',
    avatarUrl: naveedAvatar,
    content:
      'Life at SWIPE is fast, scrappy, and very real. It feels like a student startup in the best way possible: late nights, quick decisions, tight teamwork, and a lot of learning while we build.',
    rating: 5,
    projectRef: 'LIFE-COFOUNDER',
  },
  {
    id: 'life-3',
    clientName: 'Athuldev',
    clientRole: 'CEO',
    company: 'SWIPE',
    companyLogoText: 'SWIPE',
    avatarUrl: athuldevAvatar,
    content:
      'What makes SWIPE special is the mindset. We are students, but we think like a team that wants to create serious products. Every project feels like a chance to prove that young builders can do exceptional work.',
    rating: 5,
    projectRef: 'LIFE-CEO',
  },
];

export const TESTIMONIALS = LIFE_AT_SWIPE;

export const LOCATIONS: LocationItem[] = [
  {
    id: 'loc-sf',
    city: 'San Francisco',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    address: '500 Howard Street, Suite 800, San Francisco, CA 94105',
    status: 'HQ',
    coordinates: { x: 20, y: 35 }
  },
  {
    id: 'loc-london',
    city: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    address: '30 St Mary Axe, 14th Floor, London EC3A 8EP',
    status: 'Engineering Hub',
    coordinates: { x: 48, y: 28 }
  },
  {
    id: 'loc-[#singapore]',
    city: 'Singapore',
    country: 'Singapore',
    timezone: 'Asia/Singapore',
    address: '1 Marina Boulevard, #28-00 One Marina Boulevard, Singapore 018989',
    status: 'Engineering Hub',
    coordinates: { x: 78, y: 60 }
  },
  {
    id: 'loc-tokyo',
    city: 'Tokyo',
    country: 'Japan',
    timezone: 'Asia/Tokyo',
    address: 'Roppongi Hills Mori Tower, 6-10-1 Roppongi, Minato-ku, Tokyo 106-6108',
    status: 'R&D Center',
    coordinates: { x: 86, y: 40 }
  }
];

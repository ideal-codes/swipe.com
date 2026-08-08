import { TestimonialItem, LocationItem } from '../types';

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Elena Rostova',
    clientRole: 'VP of Product Engineering',
    company: 'FinPulse Global',
    companyLogoText: 'FINPULSE',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    content: 'SWIPE re-architected our core high-frequency trading platform with remarkable sub-millisecond execution rates. Their senior architectural clarity and zero-downtime deployment strategy set a new standard for our internal dev team.',
    rating: 5,
    projectRef: 'FP-CORE-ARCH'
  },
  {
    id: 'test-2',
    clientName: 'Marcus Vance',
    clientRole: 'Chief Technology Officer',
    company: 'NeuraHealth AI',
    companyLogoText: 'NEURAHEALTH',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    content: 'Partnering with SWIPE allowed us to launch our HIPAA-compliant neural diagnostics platform 4 months ahead of schedule. The team operates as a true extension of our engineering leadership.',
    rating: 5,
    projectRef: 'NH-NEURAL-V2'
  },
  {
    id: 'test-3',
    clientName: 'David K. Sterling',
    clientRole: 'Head of Infrastructure',
    company: 'OmniCloud Systems',
    companyLogoText: 'OMNICLOUD',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    content: 'Their multi-region Kubernetes mesh and zero-trust security audit eliminated critical latency bottlenecks across 12 data centers. SWIPE delivers world-class software engineering without compromise.',
    rating: 5,
    projectRef: 'OC-K8S-MESH'
  }
];

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

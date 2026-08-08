export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Leadership" | "Engineering" | "Design" | "Product" | "Research";
  location: string;
  experience: string;
  bio: string;
  email: string;
  linkedin: string;
  github?: string;
  skills: string[];
  keyAchievement: string;
  avatar: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  companyLogoText: string;
  avatarUrl: string;
  content: string;
  rating: number;
  projectRef: string;
}

export interface LocationItem {
  id: string;
  city: string;
  country: string;
  timezone: string;
  address: string;
  status: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface TechItem {
  name: string;
  color: string;
  tag: string;
}

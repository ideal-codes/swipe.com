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

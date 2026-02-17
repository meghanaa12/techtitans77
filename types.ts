
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
  OUTSIDER = 'OUTSIDER'
}

export type NetworkType = 'EDU' | 'GENERAL';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  network: NetworkType; // Strict network separation
  points: number;
  xp: number;
  streak: number;
  badges: string[];
  avatar?: string;
}

export type ResourceCategory = 'Question Paper' | 'Class Notes' | 'Study Material' | 'Reference Book' | 'Project Report' | 'Assignment';

export interface Resource {
  id: string;
  title: string;
  description: string;
  uploaderId: string;
  uploaderName: string;
  category: ResourceCategory;
  subject: string;
  semester: number;
  uploadDate: string;
  rating: number;
  downloads: number;
  tags: string[];
  aiSummary?: string;
  fileUrl: string;
  visibility: NetworkType | 'PUBLIC'; // Ensures content doesn't bleed across networks
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  type: NetworkType;
}

export interface AppState {
  user: User | null;
  resources: Resource[];
  isLoading: boolean;
  error: string | null;
}

// Storage utility for user profile data
// In a real app, this would interact with a backend API

export interface UserProfile {
  id: string;
  email: string;
  registrationType: "entrepreneur" | "company";
  name?: string;
  companyName?: string;
  registrantName?: string;
  ceoName?: string;
  address?: string;
  town?: string;
  province?: string;
  country?: string;
  telephone?: string;
  homepage?: string;
  registrationNumber?: string;
  ghanaNationalId?: string;
  ghanaPostalAddress?: string;
  zoomSlot?: string;
  bio?: string;
  industry?: string;
  location?: string;
  website?: string;
  yearsInBusiness?: string;
  companyDescription?: string;
  numberOfEmployees?: string;
  annualIncome?: string;
  heroImage?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "linkafrica_user_profiles";

export function saveProfile(profile: Omit<UserProfile, "id" | "createdAt" | "updatedAt">): UserProfile {
  const profiles = getAllProfiles();
  const id = profile.email.toLowerCase(); // Use email as ID
  const existingProfile = profiles.find(p => p.id === id);
  
  const now = new Date().toISOString();
  const updatedProfile: UserProfile = {
    ...profile,
    id,
    createdAt: existingProfile?.createdAt || now,
    updatedAt: now,
  };

  const updatedProfiles = existingProfile
    ? profiles.map(p => p.id === id ? updatedProfile : p)
    : [...profiles, updatedProfile];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfiles));
  return updatedProfile;
}

export function getProfileById(id: string): UserProfile | null {
  const profiles = getAllProfiles();
  return profiles.find(p => p.id === id) || null;
}

export function getProfileByEmail(email: string): UserProfile | null {
  return getProfileById(email.toLowerCase());
}

export function getAllProfiles(): UserProfile[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getCurrentUserEmail(): string | null {
  // In a real app, this would come from authentication
  // For now, use sessionStorage or default to the first registered email
  return sessionStorage.getItem("current_user_email") || null;
}

export function setCurrentUserEmail(email: string): void {
  sessionStorage.setItem("current_user_email", email.toLowerCase());
}


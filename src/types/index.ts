export type RoomStatus = 'available' | 'occupied' | 'booked';

export interface RoomUnit {
  id: string;
  roomNumber: string;
  floor: number;
  typeId: string;
  status: RoomStatus;
  occupantName?: string;
  notes?: string;
}

export interface RoomType {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceDaily?: number;
  priceYearly?: number;
  size: string;
  bedType: string;
  maxGuests: number;
  description: string;
  images: string[];
  features: string[];
  isPopular?: boolean;
}

export interface FacilityItem {
  id: string;
  name: string;
  category: 'kamar' | 'bersama' | 'keamanan' | 'parkir';
  description: string;
  iconName: string;
}

export interface HouseRule {
  id: string;
  title: string;
  description: string;
  category: 'umum' | 'keamanan' | 'kebersihan' | 'tamu';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface NearbyPlace {
  id: string;
  name: string;
  distance: string;
  category: 'kampus' | 'transportasi' | 'kuliner' | 'kesehatan' | 'belanja';
}

export interface ReservationRequest {
  id: string;
  name: string;
  whatsapp: string;
  roomTypeId: string;
  roomNumber?: string;
  checkInDate: string;
  durationMonths: number;
  occupantType: 'mahasiswa' | 'karyawan' | 'pasutri' | 'lainnya';
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface SurveyRequest {
  id: string;
  name: string;
  whatsapp: string;
  surveyDate: string;
  surveyTime: string;
  roomTypeId: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface KostProfile {
  name: string;
  tagline: string;
  shortBio: string;
  genderType: 'Putri' | 'Putra' | 'Campur' | 'Pasutri';
  address: string;
  city: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  whatsappNumber: string; // e.g. "6281234567890"
  phoneNumber: string;
  email: string;
  operationalHours: string;
  heroImage: string;
  aboutImages: string[];
  electricityIncluded: boolean;
  waterIncluded: boolean;
  wifiIncluded: boolean;
  depositAmount: number;
}

export interface AppStateData {
  profile: KostProfile;
  roomTypes: RoomType[];
  rooms: RoomUnit[];
  facilities: FacilityItem[];
  rules: HouseRule[];
  faqs: FaqItem[];
  nearbyPlaces: NearbyPlace[];
  reservations: ReservationRequest[];
  surveys: SurveyRequest[];
  adminPasswordHash: string; // Stored securely in state/localStorage
}

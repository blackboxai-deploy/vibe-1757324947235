export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Patient extends User {
  role: 'patient';
  medicalHistory?: MedicalRecord[];
  emergencyContact?: EmergencyContact;
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  experience: number;
  qualifications: string[];
  bio: string;
  consultationFee: number;
  availability: DoctorAvailability[];
  rating: number;
  totalConsultations: number;
  languages: string[];
  verified: boolean;
}

export interface DoctorAvailability {
  id: string;
  doctorId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  consultationType: 'video' | 'audio' | 'chat';
  symptoms: string;
  notes?: string;
  prescription?: Prescription;
  fee: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  diagnosis: string;
  symptoms: string;
  treatment: string;
  notes: string;
  attachments?: string[];
  createdAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  medications: Medication[];
  instructions: string;
  validUntil: string;
  createdAt: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Payment {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'wallet' | 'bank_transfer';
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface ConsultationRoom {
  id: string;
  appointmentId: string;
  participants: string[];
  status: 'waiting' | 'active' | 'ended';
  startedAt?: string;
  endedAt?: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'system';
}

export interface DashboardStats {
  totalAppointments: number;
  upcomingAppointments: number;
  completedConsultations: number;
  totalEarnings?: number; // for doctors
  totalSpent?: number; // for patients
}

export interface SearchFilters {
  specialization?: string;
  minRating?: number;
  maxFee?: number;
  availability?: string;
  languages?: string[];
  sortBy?: 'rating' | 'fee' | 'experience' | 'availability';
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  marketingEmails: boolean;
}

export interface Review {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  rating: number;
  comment: string;
  createdAt: string;
  patientName: string;
}

export interface Specialization {
  id: string;
  name: string;
  description: string;
  icon: string;
  averageFee: number;
  doctorCount: number;
}
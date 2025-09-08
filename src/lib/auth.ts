import { User } from './types';

// Mock authentication utilities - In production, replace with actual auth service
export class AuthService {
  private static readonly USER_KEY = 'doct_user';
  private static readonly TOKEN_KEY = 'doct_token';

  static setUser(user: User, token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  static getUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  static isAuthenticated(): boolean {
    return this.getUser() !== null && this.getToken() !== null;
  }

  static hasRole(role: User['role']): boolean {
    const user = this.getUser();
    return user?.role === role;
  }

  static isDoctor(): boolean {
    return this.hasRole('doctor');
  }

  static isPatient(): boolean {
    return this.hasRole('patient');
  }

  static isAdmin(): boolean {
    return this.hasRole('admin');
  }
}

// Mock user data for development
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'patient@example.com',
    name: 'John Patient',
    role: 'patient',
    phone: '+1234567890',
    dateOfBirth: '1985-06-15',
    avatar: 'https://placehold.co/150x150?text=Patient+Avatar',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'doctor@example.com',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    phone: '+1234567891',
    avatar: 'https://placehold.co/150x150?text=Doctor+Avatar',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Mock authentication functions
export const mockAuth = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Find mock user
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const token = 'mock_jwt_token_' + Date.now();
    return { user, token };
  },

  async register(userData: {
    name: string;
    email: string;
    password: string;
    role: 'patient' | 'doctor';
    phone?: string;
    specialization?: string;
    licenseNumber?: string;
  }): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user exists
    if (mockUsers.find(u => u.email === userData.email)) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      phone: userData.phone,
      avatar: `https://placehold.co/150x150?text=${userData.name.split(' ').map(n => n[0]).join('')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to mock users (in production, this would be saved to database)
    mockUsers.push(newUser);

    const token = 'mock_jwt_token_' + Date.now();
    return { user: newUser, token };
  },

  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    AuthService.clearAuth();
  },

  async refreshToken(): Promise<string> {
    // Simulate token refresh
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'mock_refreshed_token_' + Date.now();
  },

  async forgotPassword(email: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('No user found with this email address');
    }
    
    // In production, send password reset email
    console.log(`Password reset email sent to ${email}`);
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    
    // In production, validate token and update password
    console.log('Password reset successfully');
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...mockUsers[userIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    mockUsers[userIndex] = updatedUser;
    return updatedUser;
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters');
    }
    
    // In production, verify current password and update
    console.log('Password changed successfully');
  },
};

// Auth guard utilities
export const requireAuth = (user: User | null): user is User => {
  if (!user) {
    throw new Error('Authentication required');
  }
  return true;
};

export const requireRole = (user: User | null, role: User['role']): boolean => {
  if (!requireAuth(user)) return false;
  if (user.role !== role) {
    throw new Error(`${role} access required`);
  }
  return true;
};

export const requireDoctorOrAdmin = (user: User | null): boolean => {
  if (!requireAuth(user)) return false;
  if (!['doctor', 'admin'].includes(user.role)) {
    throw new Error('Doctor or admin access required');
  }
  return true;
};

// Token utilities
export const decodeToken = (token: string): any => {
  try {
    // In production, use actual JWT decode
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = decodeToken(token);
    if (!payload.exp) return false;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

// API headers utility
export const getAuthHeaders = (): Record<string, string> => {
  const token = AuthService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
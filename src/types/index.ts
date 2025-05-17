export interface Room {
  id: string;
  name: string;
  type: 'single' | 'double' | 'suite';
  price: number;
  description: string;
  amenities: string[];
  imageUrl: string;
  available: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  studentName: string;
  email: string;
  phone: string;
  checkIn: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// Admin user stored in Zustand after login
export interface AdminUser {
  email: string;
  isAuthenticated: boolean;
}

// Server's response to a login request
export interface LoginResponse {
  token: string;
  user: {
    email: string;
  };
}

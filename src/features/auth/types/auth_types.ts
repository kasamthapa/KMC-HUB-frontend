export interface SignupRequest {
  idNumber?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: File;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  User: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    idNumber?: string;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "Student" | "Teacher" | "Admin";
  avatar?: string;
  idNumber?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface SignupResponse {
  message: string;
  User: User;
}

export interface LoginResponse {
  message: string;
  token: string;
  User: User;
}
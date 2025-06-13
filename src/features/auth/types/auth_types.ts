// enum string {
//   Student = "Student",
//   Teacher = "Teacher",
//   Admin = "Admin",
// }
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  idNumber?: string; //Required for students
}

export interface SignupRequest {
  idNumber?: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface SignupResponse{
  message:string,
  User:User
}
export interface LoginResponse{
  message:string,
  token:string,
  User:User
}

export interface AuthResponse extends User {
  token: string;
  User: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

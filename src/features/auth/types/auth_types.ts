// enum string {
//   Student = "Student",
//   Teacher = "Teacher",
//   Admin = "Admin",
// }
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "Student" | "Teacher" | "Admin";
}

export interface SignupRequest {
  additionalInfo: string;
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
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

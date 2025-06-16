import axios, { AxiosError } from "axios";
import type { SignupRequest, LoginRequest, SignupResponse, LoginResponse } from "../types/auth_types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

console.log("API baseURL:", import.meta.env.VITE_API_URL);

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data;
  } catch (error: unknown) {
    // Assert 'error' as AxiosError to access .response and .message
    const axiosError = error as AxiosError; 
    console.error("Signup error:", axiosError.response?.data || axiosError.message);
    throw axiosError.response?.data || new Error("Signup failed");
  }
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error: unknown) {
    // Assert 'error' as AxiosError to access .response and .message
    const axiosError = error as AxiosError;
    console.error("Login error:", axiosError.response?.data || axiosError.message);
    throw axiosError.response?.data || new Error("Login failed");
  }
};
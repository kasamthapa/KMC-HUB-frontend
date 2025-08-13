/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import type { SignupRequest, LoginRequest, SignupResponse, LoginResponse } from "../types/auth_types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

console.log("API baseURL:", import.meta.env.VITE_API_URL);

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    });
    const response = await api.post("/auth/signup", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: unknown) {
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
    const axiosError = error as AxiosError;
    console.error("Login error:", axiosError.response?.data || axiosError.message);
    throw axiosError.response?.data || new Error("Login failed");
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = response.data.user;
    console.log("getCurrentUser response:", user);
    return user.id ? { ...user, _id: user.id } : user._id ? user : null;
  } catch (e: any) {
    console.error("getCurrentUser error:", e.response?.data || e.message);
    throw e;
  }
};
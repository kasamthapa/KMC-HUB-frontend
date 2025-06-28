/* eslint-disable @typescript-eslint/no-explicit-any */

import { atom } from "jotai";
import { getCurrentUser } from "../features/auth/api/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "Student" | "Teacher" | "Admin";
}

const initialState: AuthState = {
  user: (() => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      if (user && user.id) {
        return { ...user, _id: user.id }; // Normalize id to _id
      }
      return user && user._id ? user : null; // Ensure _id exists
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      return null;
    }
  })(),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

export const authAtom = atom<AuthState>(initialState);

export const authAtomWithStorage = atom(
  (get) => get(authAtom),
  async (get, set, newAuthState: AuthState | "logout") => {
    console.log("authAtomWithStorage update:", newAuthState); // Debug
    if (newAuthState === "logout") {
      console.log("Logging out");
      set(authAtom, { user: null, token: null, isAuthenticated: false });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return;
    }
    const normalizedUser = newAuthState.user && newAuthState.user._id
      ? { ...newAuthState.user, _id: newAuthState.user._id }
      : newAuthState.user && newAuthState.user._id
      ? newAuthState.user
      : null;
    set(authAtom, { ...newAuthState, user: normalizedUser });
    if (newAuthState.token) {
      localStorage.setItem("token", newAuthState.token);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    if (newAuthState.token && !normalizedUser) {
      try {
        const user = await getCurrentUser(newAuthState.token);
        const normalizedUser = user.id ? { ...user, _id: user.id } : user._id ? user : null;
        if (!normalizedUser) {
          throw new Error("Invalid user data from server");
        }
        console.log("Fetched user:", normalizedUser); // Debug
        set(authAtom, {
          ...newAuthState,
          user: normalizedUser,
          isAuthenticated: true,
        });
        localStorage.setItem("user", JSON.stringify(normalizedUser));
      } catch (e: any) {
        console.error("Failed to fetch user:", e.response?.data || e.message);
        set(authAtom, { user: null, token: null, isAuthenticated: false });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }
);
/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";
import { getCurrentUser } from "../features/auth/api/auth";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "Student" | "Teacher" | "Admin";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const loadUserFromStorage = (): User | null => {
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed && parsed.id) return { ...parsed, _id: parsed.id };
    if (parsed && parsed._id) return parsed;
    return null;
  } catch (err) {
    console.error("Error parsing stored user:", err);
    return null;
  }
};

const loadTokenFromStorage = (): string | null => {
  return localStorage.getItem("token");
};

const initialState: AuthState = {
  user: loadUserFromStorage(),
  token: loadTokenFromStorage(),
  isAuthenticated: !!loadTokenFromStorage(), // rely on token, not just user
};

export const authAtom = atom<AuthState>(initialState);

export const authAtomWithStorage = atom(
  (get) => get(authAtom),
  async (get, set, newAuthState: AuthState | "logout") => {
    if (newAuthState === "logout") {
      set(authAtom, { user: null, token: null, isAuthenticated: false });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return;
    }

    const normalizedUser =
      newAuthState.user && newAuthState.user._id
        ? { ...newAuthState.user, _id: newAuthState.user._id }
        : newAuthState.user && (newAuthState.user as any).id
        ? { ...(newAuthState.user as any), _id: (newAuthState.user as any).id }
        : null;

    set(authAtom, {
      ...newAuthState,
      user: normalizedUser,
      isAuthenticated: !!newAuthState.token,
    });

    if (normalizedUser) {
      localStorage.setItem("user", JSON.stringify(normalizedUser));
    } else {
      localStorage.removeItem("user");
    }

    if (newAuthState.token) {
      localStorage.setItem("token", newAuthState.token);
    } else {
      localStorage.removeItem("token");
    }
  }
);

/**
 * Automatically restores the session if a token is present.
 * Call this once in your App.tsx inside useEffect().
 */
export const rehydrateAuth = async (set: any) => {
  const token = loadTokenFromStorage();
  if (!token) return;

  try {
    const user = await getCurrentUser(token);
    const normalizedUser = user.id
      ? { ...user, _id: user.id }
      : user._id
      ? user
      : null;

    if (!normalizedUser) throw new Error("Invalid user from API");

    set(authAtom, {
      user: normalizedUser,
      token,
      isAuthenticated: true,
    });

    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", token);
  } catch (err) {
    console.error("Rehydrate failed, clearing session:", err);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set(authAtom, { user: null, token: null, isAuthenticated: false });
  }
};

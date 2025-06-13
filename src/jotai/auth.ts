import { atom } from "jotai";
import type { User } from "../features/auth/types/auth_types";

interface AuthState {
  user: User | null;
  token: string | null;
}

export const authAtom = atom<AuthState>({
  user: null,
  token: localStorage.getItem("token"),
});

export const authAtomWithStorage = atom(
  (get)=>get(authAtom),
  (get,set,newAuthState:AuthState)=>{
    set(authAtom,newAuthState);
    if(newAuthState.token){
      localStorage.setItem('token',newAuthState.token);
    }
    else{
      localStorage.removeItem('token');
    }
  }
)
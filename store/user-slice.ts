import { User } from "@/type/type";
import { StateCreator } from "zustand";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  isLoaded: boolean;
}

interface UserAction {
  signIn: (user: User) => void;
  signOut: () => void;
}

export interface UserSlice extends UserState, UserAction {}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  user: null,
  isLoggedIn: false,
  isLoaded: false,
  signIn: (user: User) => set({ user: user, isLoaded: true, isLoggedIn: true }),
  signOut: () => {},
});

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
  setMemory: (action: string, memory: number) => void;
}

export interface UserSlice extends UserState, UserAction {}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  user: null,
  isLoggedIn: false,
  isLoaded: false,
  signIn: (user: User) => set({ user: user, isLoaded: true, isLoggedIn: true }),
  signOut: () => set({ user: null, isLoaded: true, isLoggedIn: false }),
  setMemory: (action, memory) =>
    set((state) => ({
      user: {
        ...state.user!,
        size: state.user!.size + (action == "INCREMENT" ? memory : -memory),
      },
    })),
});

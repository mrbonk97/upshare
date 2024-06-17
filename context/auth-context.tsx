"use client";
import { useUserInfo } from "@/hooks/userUserInfo";
import { AuthContextProps, LayoutProps, User } from "@/types/type";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  user: null,
  setUser: () => {},
  signIn: async () => true,
  signOut: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<LayoutProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const signIn = async () => {
    const userInfo = await useUserInfo();

    if (userInfo == null) {
      setUser(null);
      setIsLoggedIn(false);
      return false;
    }

    setUser(userInfo);
    setIsLoggedIn(true);
    return true;
  };

  const signOut = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const values = {
    isLoggedIn,
    user,
    setUser,
    signIn,
    signOut,
  };

  useEffect(() => {
    signIn();
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

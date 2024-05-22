"use client";
import { firebaseSignOut } from "@/firebase/auth";
import { firebaseAuth } from "@/firebase/firebase";
import { user } from "@/types/type";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  user: user | null;
  signIn: (user: user) => void;
  signOut: () => void;
  testLogin: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
  testLogin: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<user | null>(null);

  const signIn = (user: user) => {
    setUser(user);
    console.log("로그인 성공! ", user.displayName);
    router.push("/home");
  };

  const signOut = () => {
    firebaseSignOut();
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  const testLogin = () => {
    setIsLoggedIn(true);
  };

  const values = {
    isLoggedIn,
    user,
    signIn,
    signOut,
    testLogin,
  };

  firebaseAuth.onAuthStateChanged((user) => {
    if (user == null) {
      setUser(null);
      setIsLoggedIn(false);
    }

    if (user != null) {
      setUser(user);
      setIsLoggedIn(true);
      console.log("새로고침 후 자동 로그인");
    }
  });

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

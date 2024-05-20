"use client";
import { user } from "@/types/type";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  user: user | null;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
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

  const signIn = () => {
    setIsLoggedIn(true);
    setUser({
      email: "hyunsuk1997@naver.com",
      id: "1",
      name: "김현석",
      profile_image: "http://asdasd.com",
    });
    router.push("/main");
  };

  const signOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  const values = {
    isLoggedIn,
    user,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

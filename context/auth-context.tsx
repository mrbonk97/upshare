"use client";
import { api } from "@/lib/api";
import { AuthContextProps, LayoutProps, user } from "@/types/type";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  user: null,
  signIn: async () => true,
  signOut: () => {},
  testLogin: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<user | null>(null);

  const signIn = async () => {
    const result = await api.get("/users/me");
    if (result.status === 200) {
      setUser(result.data);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const signOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  const testLogin = () => {
    setIsLoggedIn(true);
    setUser({
      id: "USER01",
      name: "테스트",
      email: "test@naver.com",
      imageUrl: "https://github.com/shadcn.png",
      role: "ROLE_USER",
    });
  };

  const values = {
    isLoggedIn,
    user,
    signIn,
    signOut,
    testLogin,
  };

  useEffect(() => {
    signIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

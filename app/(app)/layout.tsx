"use client";
import { Spinner } from "@/components/spinner";
import { api } from "@/lib/api";
import useStore from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const signIn = useStore.use.signIn();
  const user = useStore.use.user();
  const isLoggedIn = useStore.use.isLoaded();

  const { isPending, isError, data } = useQuery({
    queryKey: ["sign-in"],
    queryFn: () => {
      if (isLoggedIn) return user!;
      return api.get("/users/me").then((res) => res.data);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    if (isPending) return;
    if (isError) redirect("/sign-in");
    signIn(data);
  }, [isPending]);

  if (isPending)
    return (
      <main className="h-full flex2">
        <Spinner />
      </main>
    );

  return <>{children}</>;
};

export default AppLayout;

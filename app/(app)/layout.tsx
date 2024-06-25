"use client";
import { Spinner } from "@/components/spinner";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isPending, isError] = useUser();

  if (isError) redirect("/sign-in");

  if (isPending)
    return (
      <main className="h-full flex2">
        <Spinner />
      </main>
    );

  return <>{children}</>;
};

export default AppLayout;

"use client";
import { Spinner } from "@/components/spinner";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isPending, isSuccess, isError] = useUser();

  if (isSuccess) return <>{children}</>;
  if (isError) {
    console.log(isError, "왜임");
    redirect("/sign-in");
  }

  return (
    <main className="h-full flex2">
      <Spinner />
    </main>
  );
};

export default AppLayout;

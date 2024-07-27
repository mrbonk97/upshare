"use client";
import { Spinner } from "@/components/spinner";
import { useUser } from "@/hooks/useUser";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isPending, isSuccess] = useUser();

  if (isSuccess) return <>{children}</>;

  return (
    <main className="h-full flex2">
      <Spinner />
    </main>
  );
};

export default AppLayout;

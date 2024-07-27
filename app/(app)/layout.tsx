"use client";
import { Spinner } from "@/components/spinner";
import { useUser } from "@/hooks/useUser";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isPending, isError] = useUser();

  if (isError) throw "오류: 로그인 중 오류 발생";

  if (isPending)
    return (
      <main className="h-full flex2">
        <Spinner />
      </main>
    );

  return <>{children}</>;
};

export default AppLayout;

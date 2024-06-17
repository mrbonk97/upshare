"use client";
import { BottomNav } from "@/components/nav/bottom-nav";
import { LeftNavbar } from "@/components/nav/left-nav";
import { TopNavbar } from "@/components/nav/top-nav";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    redirect("/");
  }

  return (
    <>
      <TopNavbar />
      <LeftNavbar />
      {children}
      <BottomNav />
    </>
  );
}

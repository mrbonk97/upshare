import { LeftNavbar } from "@/components/nav/left-nav";
import { TopNavbar } from "@/components/nav/top-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNavbar />
      <LeftNavbar />
      {children}
    </>
  );
}

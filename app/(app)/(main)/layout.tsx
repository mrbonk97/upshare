import { Topnav } from "@/components/nav/topnav/top-nav";
import { Navbar } from "./_components/navbar/navbar";

interface FolderLayoutProps {
  children: React.ReactNode;
}

const FolderLayout = ({ children }: FolderLayoutProps) => {
  return (
    <>
      <Navbar />
      <Topnav />
      <main className="pl-80 pt-14 w-full bg-secondary">{children}</main>
    </>
  );
};

export default FolderLayout;

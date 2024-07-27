import { Topnav } from "@/components/nav/topnav/top-nav";
import { Sidenav } from "./_components/navbar/side-nav";

interface FolderLayoutProps {
  children: React.ReactNode;
}

const FolderLayout = ({ children }: FolderLayoutProps) => {
  return (
    <>
      <Topnav />
      <Sidenav />
      <main className="min-h-full md:pl-80 pt-14 min-w-96 bg-secondary">
        {children}
      </main>
    </>
  );
};

export default FolderLayout;

import { Topnav } from "@/components/nav/topnav/top-nav";
import { Sidenav } from "./_components/navbar/side-nav";
import { DeleteModal } from "./_components/delete-modal";
import { ShareModal } from "./_components/share-modal";
import { StopShareModal } from "./_components/stop-share-modal";

interface FolderLayoutProps {
  children: React.ReactNode;
}

const FolderLayout = ({ children }: FolderLayoutProps) => {
  return (
    <>
      <DeleteModal />
      <ShareModal />
      <StopShareModal />
      <Topnav />
      <Sidenav />
      <main className="min-h-full md:pl-80 pt-14 min-w-96 bg-secondary">
        {children}
      </main>
    </>
  );
};

export default FolderLayout;

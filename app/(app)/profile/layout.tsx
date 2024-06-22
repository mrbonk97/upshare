import { Topnav } from "@/components/nav/topnav/top-nav";
import { Sidenav } from "./_components/side-nav";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <>
      <Sidenav />
      <Topnav />
      {children}
    </>
  );
};

export default ProfileLayout;

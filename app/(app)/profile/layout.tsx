import { Sidenav } from "./_components/nav/sidenav/side-nav";
import { Topnav } from "./_components/nav/top-nav";

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

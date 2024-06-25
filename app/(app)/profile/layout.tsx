import { Sidenav } from "./_components/side-nav";
import { TopnavProfile } from "./_components/top-nav-profile";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <>
      <Sidenav />
      <TopnavProfile />
      {children}
    </>
  );
};

export default ProfileLayout;

import { Leftnav } from "@/components/nav/left-nav";
import { Topnav } from "@/components/nav/top-nav";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Topnav />
      <Leftnav />
      <main className="pt-14 lg:pt-16 lg:pl-72 pr-5 h-full w-full bg-secondary">
        {children}
      </main>
    </>
  );
};

export default MainLayout;

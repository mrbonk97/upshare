import { auth } from "@/auth";
import { Footer } from "@/components/nav/footer";
import { Topnav2 } from "@/components/nav/top-nav2";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: Props) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
      <Topnav2 />
      {children}
      <Footer />
    </>
  );
};

export default ProtectedLayout;

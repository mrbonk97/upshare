import { auth } from "@/auth";
import { Footer } from "@/components/nav/footer";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: Props) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default ProtectedLayout;

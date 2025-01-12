import { auth } from "@/auth";
import { Leftnav } from "@/components/nav/left-nav";
import { Topnav } from "@/components/nav/top-nav";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    folders: string[];
  }>;
}

const FolderLayout = async ({ children, params }: Props) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const { folders: folders } = await params;
  const folderId = folders[1];

  return (
    <>
      <Topnav />
      <Leftnav folderId={folderId} />
      <main className="pt-14 lg:pt-16 px-5 lg:pl-72 h-full w-full bg-secondary">
        <section className="p-4 h-full w-full rounded-t-xl bg-background">
          {children}
        </section>
      </main>
    </>
  );
};

export default FolderLayout;

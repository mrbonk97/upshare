import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Topnav } from "@/components/nav/top-nav";
import { Leftnav } from "@/components/nav/left-nav";
import { FileTable } from "./_components/table/file-table";
import { FolderContextProvider } from "./folder-context";
import { FolderBreadCrumb } from "./_components/folder-breadcrumb";

interface Props {
  params: Promise<{
    folders: string[];
  }>;
}

const FolderPage = async ({ params }: Props) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const { folders: folders } = await params;
  const folderId = folders[1];

  return (
    <>
      <Topnav />
      <FolderContextProvider folderId={folderId}>
        <Leftnav />
        <main className="pt-14 lg:pt-16 px-5 lg:pl-72 bg-secondary">
          <section className="p-4 min-h-[calc(100vh-4rem)] rounded-t-xl bg-background overflow-y-auto">
            <div className="p-2">
              <FolderBreadCrumb />
            </div>
            <FileTable />
          </section>
        </main>
      </FolderContextProvider>
    </>
  );
};

export default FolderPage;

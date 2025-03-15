import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Topnav } from "@/components/nav/top-nav";
import { FileTable } from "../_components/table/file-table";
import { FolderBreadCrumb } from "../_components/folder-breadcrumb";
import { Leftnav } from "../_components/nav/left-nav";
import { FolderContextProvider } from "../_components/folder-context";
import { Metadata } from "next";
import { MobileUploadButton } from "@/components/mobile-upload-button";

interface Props {
  params: Promise<{
    id: (string | undefined)[];
  }>;
  searchParams: Promise<{ q: string | undefined }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  // read route params
  const { id } = await params;
  const folderId = id[0];
  const sp = await searchParams;

  if (folderId == "all") return { title: "전체 폴더 - UPSHARE" };
  if (folderId == "share") return { title: "공유중인 폴더 - UPSHARE" };
  if (typeof sp.q == "string") return { title: `검색: ${sp.q} - UPSHARE` };
  return { title: "폴더 - UPSHARE" };
}

const FoldersIdPage = async ({ params, searchParams }: Props) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const sp = await searchParams;
  const { id } = await params;
  const folderId = id[0];

  return (
    <>
      <Topnav />
      <FolderContextProvider folderId={folderId} q={sp.q}>
        <Leftnav />
        <main className="pt-16 px-5 lg:pl-72 lg:bg-secondary">
          <section className="p-0 lg:p-4 min-h-[calc(100vh-4rem)] lg:rounded-t-xl bg-background overflow-y-auto">
            <div className="p-2">
              <FolderBreadCrumb />
            </div>
            <FileTable />
          </section>
        </main>
      </FolderContextProvider>
      <MobileUploadButton />
    </>
  );
};

export default FoldersIdPage;

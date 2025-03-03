import { auth } from "@/auth";
import FoldersIdPage from "./[...id]/page";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "폴더 -  UPSHARE",
};
const FolderPage = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const p = Promise.resolve({ id: [undefined] });
  const sp = Promise.resolve({ q: undefined });

  return <FoldersIdPage params={p} searchParams={sp} />;
};

export default FolderPage;

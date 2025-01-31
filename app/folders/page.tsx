import FoldersIdPage from "./[...id]/page";

const FolderPage = async () => {
  const p = Promise.resolve({ id: [undefined] });
  const sp = Promise.resolve({ q: undefined });

  return <FoldersIdPage params={p} searchParams={sp} />;
};

export default FolderPage;

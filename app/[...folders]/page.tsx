import { FolderCrumb } from "@/components/folder-crumb";
import { FileTable } from "@/components/table/file-table";
import { FerrisWheelIcon } from "lucide-react";

interface Props {
  params: Promise<{
    folders: string[];
  }>;
}

const FolderPage = async ({ params }: Props) => {
  const { folders: folders } = await params;
  const folderId = folders[1];

  return (
    <>
      <div className="p-2 flex justify-between">
        <FolderCrumb />
        <FerrisWheelIcon size={22} className="opacity-80" />
      </div>
      <FileTable folderId={folderId} />
    </>
  );
};

export default FolderPage;

import { FolderCrumb } from "@/components/folder-crumb";
import { FileTable } from "@/components/table/file-table";
import { FerrisWheelIcon } from "lucide-react";
import { getTopLevelFolderAction } from "../actions/folder/get-top-folder-action";
import { getFolderByIdAction } from "../actions/folder/get-folder-action";

interface Props {
  params: Promise<{
    folders: string[];
  }>;
}

const FolderPage = async ({ params }: Props) => {
  let folderList = null;
  const { folders: folders } = await params;
  const folderId = folders[1];

  if (folderId == null) folderList = await getTopLevelFolderAction();
  else folderList = await getFolderByIdAction(folderId);

  return (
    <>
      <div className="p-2 flex justify-between">
        <FolderCrumb />
        <FerrisWheelIcon size={22} className="opacity-80" />
      </div>
      <FileTable folderList={folderList} fileList={[]} />
    </>
  );
};

export default FolderPage;

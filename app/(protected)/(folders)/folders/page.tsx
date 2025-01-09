import { getFileAction } from "@/app/actions/file/get-file-action";
import { getFolderAction } from "@/app/actions/folder/get-folder-action";
import { FolderCrumb } from "@/components/folder-crumb";
import { FileTable } from "@/components/table/file-table";
import { FerrisWheelIcon } from "lucide-react";

const FoldersPage = async () => {
  const folderList = await getFolderAction();
  const fileList = await getFileAction();

  return (
    <>
      <div className="p-2 flex justify-between">
        <FolderCrumb />
        <FerrisWheelIcon size={22} className="opacity-80" />
      </div>
      <FileTable folderList={folderList} fileList={fileList} />
    </>
  );
};

export default FoldersPage;

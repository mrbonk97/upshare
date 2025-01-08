import { FileTable } from "@/components/file-table";
import { FolderCrumb } from "@/components/folder-crumb";
import { FerrisWheelIcon } from "lucide-react";

const FoldersPage = () => {
  return (
    <>
      <div className="p-2 flex justify-between">
        <FolderCrumb />
        <FerrisWheelIcon size={22} className="opacity-80" />
      </div>
      <FileTable />
    </>
  );
};

export default FoldersPage;

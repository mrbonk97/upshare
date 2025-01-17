import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  folderId: string;
  folderName: string;
}

export const FolderList = ({ folderId, folderName }: Props) => {
  return (
    <Link
      href={`/folders/${folderId}`}
      role="row"
      className="px-2 py-4 grid grid-cols-10 gap-5 cursor-pointer hover:bg-blue-50 duration-150"
    >
      <div role="cell" className="px-1 col-span-3">
        <Image
          src={"/icons/001-folder.svg"}
          alt="folder"
          height={24}
          width={24}
          className="inline mr-2"
        />
        {folderName}
      </div>
      <div role="cell" className="px-1 col-span-2 text-right">
        -
      </div>
      <div role="cell" className="px-1 col-span-1 text-right">
        -
      </div>
      <div role="cell" className="px-1 col-span-2 text-center">
        -
      </div>
      <div role="cell" className="px-1 col-span-1 text-center">
        -
      </div>
      <div role="cell" className="px-1 col-span-1 text-right">
        <EllipsisIcon className="inline" />
      </div>
    </Link>
  );
};

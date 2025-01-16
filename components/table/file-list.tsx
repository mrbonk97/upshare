import { convertByte, getFileIcon } from "@/lib/utils";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  fileId: string;
  fileName: string;
  fileSize: number;
  fileExtension: string;
  createdAt: string;
}

export const FileList = ({
  fileId,
  fileName,
  fileSize,
  fileExtension,
  createdAt,
}: Props) => {
  const handleDownload = () => {
    console.log(fileId);
  };

  return (
    <div
      role="row"
      onClick={() => handleDownload()}
      className="px-2 py-4 grid grid-cols-10 cursor-pointer hover:bg-blue-50 duration-150"
    >
      <div role="cell" className="col-span-4">
        <Image
          src={getFileIcon(fileExtension)}
          alt="folder"
          height={24}
          width={24}
          className="inline mr-2"
        />
        {fileName}
      </div>
      <div role="cell" className="col-span-2 text-center">
        {new Date(createdAt).toISOString().split("T")[0]}
      </div>
      <div role="cell" className="col-span-1 text-center">
        {convertByte(fileSize)}
      </div>
      <div role="cell" className="col-span-1 text-center">
        -
      </div>
      <div role="cell" className="col-span-1 text-center">
        6일 남음
      </div>
      <div role="cell" className="text-right col-span-1">
        <EllipsisIcon className="inline" />
      </div>
    </div>
  );
};

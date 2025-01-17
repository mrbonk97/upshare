import { convertByte, getFileIcon } from "@/lib/utils";
import { EllipsisIcon, XIcon } from "lucide-react";
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
      className="px-2 py-4 grid grid-cols-10 gap-5 cursor-pointer hover:bg-blue-50 duration-150"
    >
      <div role="cell" className="px-1 col-span-3">
        <Image
          src={getFileIcon(fileExtension)}
          alt="folder"
          height={24}
          width={24}
          className="inline mr-2"
        />
        {fileName}
      </div>
      <div role="cell" className="px-1 col-span-2 text-right">
        {new Date(createdAt).toISOString().split("T")[0]}
      </div>
      <div role="cell" className="px-1 col-span-1 text-right">
        {convertByte(fileSize)}
      </div>
      <div role="cell" className="px-1 col-span-2 flex2">
        <XIcon opacity={0.8} size={20} />
      </div>
      <div role="cell" className="px-1 col-span-1 text-center">
        6일 남음
      </div>
      <div role="cell" className="px-1 col-span-1 text-right">
        <EllipsisIcon className="inline" />
      </div>
    </div>
  );
};

import { EllipsisIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  fileId: string;
  fileName: string;
  createdAt: string;
}

export const FileList = ({ fileId, fileName }: Props) => {
  return (
    <div
      role="row"
      className="px-2 py-4 grid grid-cols-10 cursor-pointer hover:bg-blue-50 duration-150"
    >
      {fileId}
      <div role="cell" className="col-span-4">
        <Image
          src={"/icons/005-doc.svg"}
          alt="folder"
          height={24}
          width={24}
          className="inline mr-2"
        />
        {fileName}
      </div>
      <div role="cell" className="col-span-2 text-center">
        -
      </div>
      <div role="cell" className="col-span-1 text-center">
        -
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

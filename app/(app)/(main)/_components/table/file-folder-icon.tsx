import Image from "next/image";

interface FileFolderIconProps {
  type: "FILE" | "FOLDER";
  isDragHover: boolean;
}

export const FileFolderIcon = ({
  type,
  isDragHover = false,
}: FileFolderIconProps) => {
  if (type == "FILE")
    return (
      <Image
        src={"/images/folder/document.svg"}
        width={28}
        height={28}
        alt="document"
      />
    );

  if (type == "FOLDER" && isDragHover)
    return (
      <Image
        src={"/images/folder/folder-open.svg"}
        width={28}
        height={28}
        alt="folder"
      />
    );

  if (type == "FOLDER" && !isDragHover)
    return (
      <Image
        src={"/images/folder/folder-close.svg"}
        width={28}
        height={28}
        alt="folder"
      />
    );

  return null;
};

"use client";
import { folderDepth } from "@/api/folder-api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FolderBreadCrumbType } from "@/types/type";
import { Slash } from "lucide-react";
import { useEffect, useState } from "react";

interface FolderBreadCrumbProps {
  folderId?: string;
}

export const FolderBreadCrumb: React.FC<FolderBreadCrumbProps> = ({
  folderId,
}) => {
  const [depth, setDepth] = useState<FolderBreadCrumbType[]>([]);
  console.log("breadcrumb 리로드", depth);

  useEffect(() => {
    const handleBreadCrumb = async () => {
      setDepth(await folderDepth(folderId));
    };

    handleBreadCrumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {depth.map((item) => (
          <div key={item.id} className="flex2">
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/home/${item.id}`} className="ml-2">
                {item.folder_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

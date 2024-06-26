"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { findFolderHierarchy } from "@/lib/action/file-action";

import { FolderBreadCrumbType } from "@/type/type";
import { useQuery } from "@tanstack/react-query";
import { Slash } from "lucide-react";
import Link from "next/link";

interface FolderBreadProps {
  folderId?: string;
}

export const FolderBread = ({ folderId }: FolderBreadProps) => {
  const { isSuccess, data } = useQuery({
    queryKey: ["bread-crumb", folderId],
    queryFn: () => findFolderHierarchy(folderId),
  });

  return (
    <Breadcrumb className="ml-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/home">Home</Link>
        </BreadcrumbItem>
        {data?.toReversed().map((item: FolderBreadCrumbType) => (
          <span key={item.id} className="flex items-center gap-2">
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <Link href={`/folders/${item.id}`}>{item.folder_name}</Link>
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

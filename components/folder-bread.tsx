"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { api } from "@/lib/api";
import { FolderBreadCrumbType } from "@/type/type";
import { useQuery } from "@tanstack/react-query";
import { Slash } from "lucide-react";

interface FolderBreadProps {
  folderId?: string;
}

export const FolderBread = ({ folderId }: FolderBreadProps) => {
  if (folderId == undefined)
    return (
      <Breadcrumb className="ml-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

  const { isPending, error, data } = useQuery({
    queryKey: ["bread-crumb"],
    queryFn: () =>
      api.get(`/folders/find-depth/${folderId}`).then((res) => res.data),
  });

  const crumbList: FolderBreadCrumbType[] = data;

  if (isPending)
    return (
      <Breadcrumb className="ml-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

  return (
    <Breadcrumb className="ml-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {crumbList.map((item, idx) => (
          <span key={item.id} className="flex items-center gap-2">
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/folder/${item.id}`}>
                {item.folder_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

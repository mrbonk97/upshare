"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FolderType } from "@/constants/type";
import { Fetcher } from "@/lib/utils";
import { Slash } from "lucide-react";
import { Fragment } from "react";
import useSWR from "swr";

interface Props {
  folderId: string;
}

export const FolderCrumb = ({ folderId }: Props) => {
  const isRoot = !folderId;
  const result = useSWR(
    !isRoot ? `/api/folders/${folderId}/structure` : null,
    Fetcher
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key={"link"}>
          <BreadcrumbLink href="/folders">홈</BreadcrumbLink>
        </BreadcrumbItem>
        {!isRoot &&
          result.data?.data?.structure?.map((item: FolderType) => (
            <Fragment key={`crumb-${item.FOLDER_ID}`}>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/folders/${item.FOLDER_ID}`}>
                  {item.FOLDER_NAME}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

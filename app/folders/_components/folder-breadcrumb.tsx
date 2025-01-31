"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FolderType } from "@/constants/type";
import { checkIfRoot, Fetcher } from "@/lib/utils";
import { Slash } from "lucide-react";
import { Fragment, useContext } from "react";
import useSWR from "swr";
import { FolderContext } from "./folder-context";
import { Spinner } from "@/components/spinner";

export const FolderBreadCrumb = () => {
  const context = useContext(FolderContext);
  const folderId = context.getFolderId();
  const hoverItem = context.hoverItem;
  const isRoot = checkIfRoot(folderId);
  const result = useSWR(isRoot ? null : `/api/folders/${folderId}/structure`, Fetcher);

  // 루트일 때는 홈밖에 없으니깐
  if (isRoot) {
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem
          aria-selected={hoverItem?.id == -1}
          className="px-1 border-2 border-transparent aria-selected:border-blue-400 border-dashed"
          onDragOver={() => context.onDragOver({ type: "FOLDER", id: -1 })}
          onDragLeave={context.onDragLeave}
          onDragEnd={context.onDragEnd}
          onDrop={context.onDrop}
        >
          <BreadcrumbLink href="/folders">홈</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem
          aria-selected={hoverItem?.id == -1}
          className="px-1 border-2 border-transparent aria-selected:border-blue-400 border-dashed"
          onDragOver={() => context.onDragOver({ type: "FOLDER", id: -1 })}
          onDragLeave={context.onDragLeave}
          onDragEnd={context.onDragEnd}
          onDrop={context.onDrop}
        >
          <BreadcrumbLink href="/folders">홈</BreadcrumbLink>
        </BreadcrumbItem>
        {result.isLoading && (
          <Fragment>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <Spinner className="h-3 border border-foreground border-t-transparent opacity-70" />
          </Fragment>
        )}

        {result.data?.data?.structure?.map((item: FolderType) => (
          <Fragment key={`crumb-${item.FOLDER_ID}`}>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              aria-selected={item.FOLDER_ID == hoverItem?.id}
              className="px-1 border-2 border-transparent aria-selected:border-blue-400 border-dashed"
              onDragOver={() => context.onDragOver({ type: "FOLDER", id: item.FOLDER_ID })}
              onDragEnd={() => context.onDragEnd()}
              onDrop={() => context.onDrop()}
              onDragLeave={context.onDragLeave}
            >
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

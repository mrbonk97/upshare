"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FolderBreadCrumbType } from "@/types/type";

import { Slash } from "lucide-react";
import { useState } from "react";

interface FolderBreadCrumbProps {
  depth: FolderBreadCrumbType[];
}

export const FolderBreadCrumb: React.FC<FolderBreadCrumbProps> = ({
  depth,
}) => {
  const [hover, setHover] = useState(-1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {depth.map((item, idx) => (
          <div key={item.id} className="flex2">
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem
              onDragOver={(e) => {
                e.preventDefault();
                console.log(idx);
                setHover(idx);
              }}
              onDragExit={(e) => {
                e.preventDefault();
                console.log("호호호");
                setHover(-1);
              }}
              onDragEnd={(e) => {
                e.preventDefault();
                console.log("호호호");
                setHover(-1);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                console.log("호호호");
                setHover(-1);
              }}
              onDrop={(e) => {
                e.preventDefault();
                console.log("호호호");
                setHover(-1);
              }}
            >
              <BreadcrumbLink
                href={`/home/${item.id}`}
                className={`ml-2 ${
                  hover == idx && "border-2 border-secondary border-dashed"
                }`}
              >
                {item.folder_name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

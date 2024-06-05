import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FolderBreadCrumbType } from "@/types/type";

import { Slash } from "lucide-react";

interface FolderBreadCrumbProps {
  depth: FolderBreadCrumbType[];
}

export const FolderBreadCrumb: React.FC<FolderBreadCrumbProps> = ({
  depth,
}) => {
  console.log(depth);
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

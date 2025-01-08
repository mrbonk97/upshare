import { FolderCrumb } from "@/components/folder-crumb";
import { Ellipsis, EllipsisIcon, FerrisWheelIcon } from "lucide-react";

const FoldersPage = () => {
  return (
    <section className="p-4 h-full w-full rounded-t-xl bg-background">
      <div className="p-2 flex justify-between">
        <FolderCrumb />
        <FerrisWheelIcon size={22} className="opacity-80" />
      </div>
      <div role="table" className="w-full font-medium opacity-80">
        <div role="tablehead" className="px-2 mt-5 border-y py-2">
          <div role="row" className="grid grid-cols-10">
            <div role="columnheader" className="col-span-4">
              파일명
            </div>
            <div role="columnheader" className="col-span-2">
              등록 날짜
            </div>
            <div role="columnheader" className="col-span-1">
              파일 크기
            </div>
            <div role="columnheader" className="col-span-1">
              공유
            </div>
            <div role="columnheader" className="col-span-1">
              남은 시간
            </div>
            <div role="columnheader" className="text-right col-span-1">
              옵션
            </div>
          </div>
        </div>
        <div role="tablebody" className="px-2 mt-5 space-y-5">
          <div role="row" className="grid grid-cols-10">
            <div role="cell" className="col-span-4">
              floders-crumb.tsx
            </div>
            <div role="cell" className="col-span-2">
              2025-01-08
            </div>
            <div role="cell" className="col-span-1">
              24.23MB
            </div>
            <div role="cell" className="col-span-1">
              아님
            </div>
            <div role="cell" className="col-span-1">
              6일 남음
            </div>
            <div role="cell" className="text-right col-span-1">
              <EllipsisIcon className="inline" />
            </div>
          </div>
          <div role="row" className="grid grid-cols-10">
            <div role="cell" className="col-span-4">
              floders-crumb.tsx
            </div>
            <div role="cell" className="col-span-2">
              2025-01-08
            </div>
            <div role="cell" className="col-span-1">
              24.23MB
            </div>
            <div role="cell" className="col-span-1">
              아님
            </div>
            <div role="cell" className="col-span-1">
              6일 남음
            </div>
            <div role="cell" className="text-right col-span-1">
              <EllipsisIcon className="inline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoldersPage;

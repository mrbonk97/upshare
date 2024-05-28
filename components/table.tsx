"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  FileText,
  FileTextIcon,
  Folder,
  LucideFileText,
  LucideFolder,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File } from "@/types/type";
import { ShareModal } from "./modal/share-modal";
import { DeleteModal } from "./modal/delete-modal";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

const handleFileDownload = async (fileId: string, fileName: string) => {
  const response = await api.get(`/files/${fileId}`, { responseType: "blob" });
  if (response.status === 200) {
    console.log(response.data);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
};

export const columns: ColumnDef<File>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "originalFileName",
    header: "이름",
    cell: ({ row }) => {
      if (row.original.type == "FILE") {
        return (
          <div
            className="flex items-center gap-2 hover:underline underline-offset-2 cursor-pointer"
            onClick={() => {
              if (row.original.type == "FILE")
                handleFileDownload(
                  row.original.id,
                  row.original.originalFileName
                );
            }}
          >
            <LucideFileText />
            {row.getValue("originalFileName")}
          </div>
        );
      } else
        return (
          <Link
            href={`/home/${row.original.id}`}
            className="flex items-center gap-2 hover:underline underline-offset-2 cursor-pointer"
          >
            <LucideFolder />
            {row.getValue("originalFileName")}
          </Link>
        );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          수정한 날짜
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("updatedAt")}</div>
    ),
  },
  {
    accessorKey: "username",
    header: () => <div className="">수정한 사람</div>,
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>메뉴</DropdownMenuLabel>
            <DropdownMenuItem>
              <Button variant={"ghost"}>다운로드</Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <ShareModal />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteModal />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo({ data }: { data: any }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [selectedRow, setSelectedRow] = useState("");
  const [hoverRow, setHoverRow] = useState("");

  const handleFolderChange = async () => {
    if (data[hoverRow].type != "FOLDER") return;
    if (data[selectedRow].type != "FILE") return;

    const response = await api.put("/files/change-folder", {
      fileId: data[selectedRow].id,
      folderId: data[hoverRow].id,
    });
    if (response.status == 200) {
      console.log;
    }
  };

  const handleFolderChange2 = async () => {
    if (data[hoverRow].type != "FOLDER") return;
    if (data[selectedRow].type != "FOLDER") return;

    const response = await api.put("/files/change-folder2", {
      folderId: data[selectedRow].id,
      parentFolderId: data[hoverRow].id,
    });
    if (response.status == 200) {
      console.log;
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full pr-5">
      <div className="flex items-center py-4">
        <Input
          placeholder="이름 검색..."
          value={
            (table.getColumn("originalFileName")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("originalFileName")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  draggable
                  onDragStart={(e) => {
                    setSelectedRow(row.id);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setHoverRow(row.id);
                    console.log(row.id, row.id == selectedRow);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFolderChange();
                  }}
                  onDragEnd={() => {
                    setSelectedRow("-1");
                    setHoverRow("-1");
                  }}
                  className={`${
                    row.id == hoverRow &&
                    hoverRow != selectedRow &&
                    "border-2 border-secondary border-dashed"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </div>
  );
}

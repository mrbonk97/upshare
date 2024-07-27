import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FileTableLayoutProps {
  children: React.ReactNode;
}

export const TableLayout = ({ children }: FileTableLayoutProps) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>파일명</TableHead>
          <TableHead className="hidden lg:table-cell text-center">
            수정된 날짜
          </TableHead>
          <TableHead className="hidden md:table-cell text-center">
            수정한 사람
          </TableHead>
          <TableHead className="hidden lg:table-cell text-center">
            파일크기
          </TableHead>
          <TableHead className="text-center p-0">좋아요</TableHead>
          <TableHead className="text-center">메뉴</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

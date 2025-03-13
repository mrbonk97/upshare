import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

export const MobileSearchIcon = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <SearchIcon className="p-1 h-8 w-8" />
      </SheetTrigger>
      <SheetContent side={"top"} className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>파일 검색</SheetTitle>
          <SheetDescription className="sr-only">파일이름으로 검새할 수 있습니다.</SheetDescription>
        </SheetHeader>
        <form action={"/folders/search"} className="mt-5 relative">
          <Input
            name="q"
            autoComplete="off"
            className="pl-10 pr-5 h-8 focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="absolute left-2 top-1/2 -translate-y-1/2 hover:opacity-80 duration-150"
          >
            <SearchIcon />
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

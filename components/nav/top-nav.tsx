import { Input } from "../ui/input";

export const TopNavbar = () => {
  return (
    <header className="fixed top-0 w-full bg-secondary text-secondary-foreground py-1 flex items-center justify-between px-14 z-30">
      <div>로</div>
      <div className="w-96 relative">
        <div className="h-10 w-12 absolute cursor-pointer">Q</div>
        <Input className="pl-10" />
      </div>
      <div className="flex gap-5">
        <div>로</div>
        <div>로</div>
        <div>로</div>
      </div>
    </header>
  );
};

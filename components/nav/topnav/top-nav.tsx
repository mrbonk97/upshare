import { SearchBox } from "./search";
import { SideSheet } from "./side-sheet";
import { UserButton } from "./user-button";

export const Topnav = () => {
  return (
    <>
      <header className="fixed top-0 w-full h-14 flex items-center justify-between px-5 sm:px-10 bg-secondary">
        <div className="md:hidden">로고요</div>
        <div className="hidden md:block"></div>
        <SearchBox />
        <div className="hidden md:block">
          <UserButton />
        </div>
        <SideSheet />
      </header>
      <div className="fixed left-80 top-14 h-5 w-5 bg-background rounded-full z-20" />
      <div className="fixed left-[310px] top-12 h-5 w-5 bg-secondary z-10" />
    </>
  );
};

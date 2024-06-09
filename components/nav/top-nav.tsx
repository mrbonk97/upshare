"use client";
import { Search } from "lucide-react";
import { Logo } from "../logo";
import { Input } from "../ui/input";
import { UserAvatar } from "./avatar";
import { NotificationSheet } from "./notification-sheet";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const TopNavbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/search?q=" + search);
  };

  return (
    <header className="fixed top-0 w-full bg-tertiary text-secondary-foreground h-14 py-4 flex items-center justify-between px-10 z-30">
      <Logo />
      <div className="w-96 py-2 px-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Button
            type="submit"
            variant={"ghost"}
            className="absolute flex2 h-10 w-12 cursor-pointer"
          >
            <Search />
          </Button>
          <Input
            className="pl-14 focus:outline-none focus-visible::outline-none focus:border-none focus:right-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="flex gap-1 items-center">
        <UserAvatar />
        {/* <NotificationSheet /> */}
      </div>
    </header>
  );
};

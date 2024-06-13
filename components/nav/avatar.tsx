"use client";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { UserImage } from "../user-image";

export const UserAvatar = () => {
  const auth = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <UserImage />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{auth.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">프로필</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href={"/logout"}>로그아웃</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

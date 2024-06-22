"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar = ({ className }: UserAvatarProps) => {
  const user = useStore.use.user();

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>{user?.username}</AvatarFallback>
    </Avatar>
  );
};

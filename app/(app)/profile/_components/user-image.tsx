"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useStore from "@/store/store";

export const UserImage = () => {
  const user = useStore.use.user();

  return (
    <Avatar className="h-28 w-28">
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>{user?.username}</AvatarFallback>
    </Avatar>
  );
};

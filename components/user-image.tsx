"use client";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserImageProps {
  className?: string;
}

export const UserImage: React.FC<UserImageProps> = ({ className }) => {
  const auth = useAuth();

  return (
    <Avatar className={className}>
      <AvatarImage
        src={auth.user?.imageUrl}
        referrerPolicy="no-referrer"
        alt="avatar"
      />
      <AvatarFallback className="bg-rose-300 text-center text-xs font-bold">
        {auth.user?.name}
      </AvatarFallback>
    </Avatar>
  );
};

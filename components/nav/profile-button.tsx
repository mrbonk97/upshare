import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileButton = () => {
  return (
    <Avatar className="hidden lg:block">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

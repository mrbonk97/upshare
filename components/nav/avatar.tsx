'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export const UserAvatar = () => {
  const auth = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none'>
        <Avatar>
          <AvatarImage src={auth.user?.imageUrl} referrerPolicy='no-referrer' alt='avatar' />
          <AvatarFallback className='bg-rose-300 text-center text-xs font-bold'>{auth.user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{auth.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='/profile'>프로필</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => auth.signOut()} className='cursor-pointer'>
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

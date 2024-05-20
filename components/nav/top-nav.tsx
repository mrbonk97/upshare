import { Search } from 'lucide-react';
import { Logo } from '../logo';
import { Input } from '../ui/input';
import { UserAvatar } from './avatar';
import { NotificationSheet } from './notification-sheet';
import { Button } from '../ui/button';

export const TopNavbar = () => {
  return (
    <header className='fixed top-0 w-full bg-secondary/50 text-secondary-foreground h-14 py-2 flex items-center justify-between px-10 z-30'>
      <Logo />
      <div className='w-96 py-2 px-5'>
        <Button variant={'ghost'} className='absolute flex2 h-10 w-12 cursor-pointer'>
          <Search />
        </Button>
        <Input className='pl-14 focus:outline-none focus-visible::outline-none focus:border-none focus:right-0' />
      </div>
      <div className='flex gap-1 items-center'>
        <UserAvatar />
        <NotificationSheet />
      </div>
    </header>
  );
};

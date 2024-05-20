import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bell, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { notification } from '@/constants/notification';

export const NotificationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} className='focus:outline-none'>
          <Bell />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>알림창</SheetTitle>
          <SheetDescription>알림은 2주 동안 유지됩니다.</SheetDescription>
        </SheetHeader>
        <ul className='space-y-5 mt-5'>
          {notification.map((item, idx) => {
            return (
              <li key={idx}>
                <Alert>
                  <AlertTitle>{item.title}</AlertTitle>
                  <AlertDescription>
                    <hgroup>
                      <h4>{item.date}</h4>
                      <h4>{item.desc}</h4>
                    </hgroup>
                  </AlertDescription>
                </Alert>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

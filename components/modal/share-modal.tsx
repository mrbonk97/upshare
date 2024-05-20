'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Copy } from 'lucide-react';
import { useToast } from '../ui/use-toast';

export const ShareModal = () => {
  const { toast } = useToast();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'ghost'} className='w-full'>
            공유하기
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>파일을 공유하고 있습니다.</DialogTitle>
            <DialogDescription>아래 코드를 통해 파일에 접근하실 수 있습니다.</DialogDescription>
          </DialogHeader>
          <div className='flex justify-center gap-5 mt-16 mb-10'>
            <span className='text-2xl px-5'>코드: 429542</span>
            <Button
              variant={'ghost'}
              onClick={() => {
                toast({
                  title: '클립보드에 복사하였습니다.',
                  description: '파일 코드: 123456',
                });
              }}
            >
              <Copy />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

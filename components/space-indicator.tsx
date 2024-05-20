import { Progress } from '@/components/ui/progress';

export const SpaceIndicator = () => {
  return (
    <div className='w-full p-5 flex flex-col'>
      <span className='text-md font-semibold'>저장소</span>
      <Progress value={33} className='h-1 mt-2 bg-primary-foreground' />
      <span className='mt-1 text-sm'>33mb / 100mb 사용량 (33%)</span>
    </div>
  );
};

import { UserAvatar } from '@/components/nav/avatar';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  return (
    <main className='h-full w-full pl-[400px] pt-24'>
      <section className='h-full w-full flex2'>
        <article className='bg-zinc-200 h-96 w-96 p-5 flex flex-col items-center justify-between'>
          <UserAvatar />
          <Button className='w-full py-6'>프로필 수정</Button>
          <Button className='w-full py-6'>FAQ</Button>
          <Button className='w-full py-6'>개인정보 처리방침</Button>
          <Button variant={'destructive'} className='w-full py-6'>
            회원탈퇴
          </Button>
        </article>
      </section>
    </main>
  );
};

export default ProfilePage;

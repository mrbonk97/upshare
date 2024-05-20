import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <main className='h-full w-full flex relative'>
      <section className='absolute md:static h-full w-full md:w-1/2 flex items-center justify-center flex-col p-5'>
        <article className='w-full max-w-96 bg-primary-foreground p-5 rounded-lg shadow-md md:shadow-none md:rounded-none md:bg-transparent'>
          <h1 className='pl-2 text-5xl font-bold break-words text-secondary'>Welcome Back</h1>
          <div className='mt-16 space-y-6'>
            <Button className='w-full py-6'>
              <Link href={process.env.GOOGLE_OAUTH2_URL!}>구글 로그인</Link>
            </Button>
            <Button className='w-full py-6 bg-green-500 hover:bg-green-500/90'>
              <Link href={process.env.NAVER_OAUTH2_URL!}>네이버 로그인</Link>
            </Button>
            <Button className='w-full py-6 bg-yellow-500 hover:bg-yellow-500/90'>
              <Link href={process.env.KAKAO_OAUTH2_URL!}>카카오 로그인</Link>
            </Button>
            <Button className='w-full py-6 bg-secondary hover:bg-secondary/90'>
              <Link href='/test-login'>테스트 로그인</Link>
            </Button>
          </div>
        </article>
      </section>
      <section className='h-full w-full md:w-1/2 overflow-hidden relative -z-10'>
        <div className='h-full w-full absolute fade'></div>
        <Image
          src={'/images/background.jpg'}
          alt='background'
          height={2000}
          width={2000}
          priority
          className='object-cover h-full'
        />
      </section>
    </main>
  );
};

export default SignInPage;

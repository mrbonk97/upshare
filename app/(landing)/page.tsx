'use client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Reviews } from '@/constants/reviews';
import { easeIn, motion } from 'framer-motion';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { MoveRight } from 'lucide-react';
import { useEffect } from 'react';
import { Logo } from '@/components/logo';
import style from './landing.module.css';
import Image from 'next/image';

const LandingPage = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isLoggedIn) router.push('/home');
  }, []);

  const variants = {
    initial: {
      opacity: 0,
      y: 20,
      viewport: { once: true },
    },
    inView: {
      opacity: 1,
      y: 0,
      ease: easeIn,
      viewport: { once: true },
    },
    buttonInitial: {
      opacity: 0,
      x: -200,
      viewport: { once: true },
    },
    buttonInView: {
      opacity: 1,
      x: 0,
      viewport: { once: true },
    },
  };

  return (
    <main className='w-full pt-28 flex items-center flex-col gap-40 '>
      <motion.div
        variants={variants}
        whileInView='inView'
        initial='initial'
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Image src={'/images/logo.png'} width={150} height={150} alt='logo' />
      </motion.div>
      <hgroup className='space-y-5'>
        <motion.h1
          className='text-secondary text-center text-3xl sm:text-6xl sm:text-left font-semibold tracking-wider'
          variants={variants}
          whileInView='inView'
          initial='initial'
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          파일 스토리지 서비스
        </motion.h1>
        <motion.p
          className='text-primary/50 text-center text-xl sm:text-left sm:text-3xl font-semibold'
          variants={variants}
          whileInView='inView'
          initial='initial'
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          외부 PC에서 안전하게 접속할 수 있습니다.
        </motion.p>
      </hgroup>

      <motion.section
        className='w-full flex2 sm:block sm:w-80 relative group'
        variants={variants}
        initial='buttonInitial'
        whileInView='buttonInView'
        transition={{ duration: 0.5, delay: 0.7, ease: 'circOut' }}
        viewport={{ once: true }}
      >
        <Link href={'/sign-in'}>
          <div className='bg-secondary static flex2 sm:block sm:absolute h-16 w-64 sm:w-16 rounded-full bg-pc-500 peer group-hover:w-64 left-0 group-hover:left-4 duration-500 ease-[cubic-bezier(0.65,0,.076,1);] shadow-lg'>
            <MoveRight className='text-primary-foreground sm:absolute sm:mt-3 ml-3 h-10 w-10 duration-300' />
            <button className='text-2xl font-bold text-primary-foreground ml-2 mr-5 sm:hidden'>바로 시작하기</button>
          </div>
          <button className='group-hover:text-primary-foreground hidden sm:block w-full h-16 text-center text-2xl relative duration-300 font-bold tracking-wider'>
            바로 시작하기
          </button>
        </Link>
      </motion.section>

      <section className='mt-20 w-[95%] overflow-hidden'>
        <div className='w-[290rem] space-x-20'>
          {Reviews.map((item, idx) => {
            return (
              <Card className={`inline-block h-80 overflow-hidden ${style.box}`} key={idx}>
                <CardHeader className='flex flex-row items-center gap-5'>
                  <Avatar className='w-14 h-14'>
                    <AvatarImage src='/avatar.jpg' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardTitle className='text-lg'>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span>{item.name}</span>
                  <Separator className='my-2' />
                  <p className='text-zinc-600'>{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <Separator className='ml-[10%] w-4/5 my-10' />
      <section className='w-full px-[10%] sm:px-[20%] xl:px-[25%]'>
        <motion.hgroup
          className='text-primary/90 text-xl sm:text-4xl font-semibold mb-40'
          variants={variants}
          initial='initial'
          whileInView='inView'
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className='leading-normal break-words'>
            제가 쓰고싶어서 만들었보았습니다. 외부 PC에서 oneDrive나 카카오톡을 키고 싶지 않더라고요. 한번 무료로
            사용해보세요.
          </p>
        </motion.hgroup>
      </section>
    </main>
  );
};

export default LandingPage;

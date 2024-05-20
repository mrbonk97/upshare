import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href={'/home'} className='text-3xl font-semibold'>
      Ou
    </Link>
  );
};

'use client';
import { useAuth } from '@/context/auth-context';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const CallbackPage = () => {
  const auth = useAuth();
  const params = useSearchParams();
  const access_token = params.get('access_token');

  useEffect(() => {
    if (access_token != null) {
      localStorage.setItem('access_token', access_token);
      auth.signIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <main></main>;
};

export default CallbackPage;

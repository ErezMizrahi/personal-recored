'use client';
import { signOut } from 'next-auth/react'
import { useEffect } from 'react';

const SignOut = () => {

  useEffect(() => {
    signOut({ redirect: true, callbackUrl: "/" });
  }, []);

  return <></>;
  
}

export default SignOut
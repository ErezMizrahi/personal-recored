'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const SignIn = () => {
   const { update } = useSession();
   const router = useRouter();

   console.log('here is the problem?')

   useEffect(() => {
    const updateSession = async () => {
      await update({ isNew: false });
      router.push('/');
    }
    updateSession();
   }, []);
   
  return (<></>
  )
}

export default SignIn
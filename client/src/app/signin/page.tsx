'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const SignIn = () => {
   const { update } = useSession();
   const router = useRouter();

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
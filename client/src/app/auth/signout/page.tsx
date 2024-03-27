'use client';
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const SignIn = () => {

   useEffect(() => {
      signOut({ callbackUrl: "/" });
   }, []);
   
  return (<></>)
}

export default SignIn
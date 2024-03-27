'use client';
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react';

const AutoSignIn = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("No JWT");
      console.log(status);
      void signIn("google");
    }
  }, [status]);

  return <div></div>;
  
}

export default AutoSignIn
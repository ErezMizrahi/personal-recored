import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

const PersonalInfo = async () => {
  const session = await getServerSession();
  if(!session || !session.user) {
    redirect('/');
  }

  return (
    <>
    <div>{session?.user.firstName}</div>
    <div>{session?.user.lastName}</div>
    <div>{session?.user.age}</div>
    <div>{session?.user.gender}</div>
    <div>{session?.user.height}</div>
    <div>{session?.user.weight}</div>

    </>
  )
}

export default PersonalInfo
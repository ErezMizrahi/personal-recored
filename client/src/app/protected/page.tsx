import { getServerSession } from 'next-auth'
import React from 'react'

const Protected = async () => {
  const session = await getServerSession();
  if(!session || !session.user) {
    // redirect('/api/auth/signin');
  }
  return (
    <div>Protected</div>
  )
}

export default Protected
import { getServerSession } from 'next-auth'
import React from 'react'

const Workouts = async () => {
  const session = await getServerSession();
  if(!session || !session.user) {
    // redirect('/api/auth/signin');
  }
  return (
    <div>Workouts</div>
  )
}

export default Workouts
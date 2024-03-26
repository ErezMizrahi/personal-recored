import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import PRButton from '../components/ui/PRButton';

const Workouts = async () => {
  const session = await getServerSession();
  if(!session || !session.user) {
    redirect('/');
  }

  const clickHandlers = {
    create: {
      onClick: {
        
        redirect: '/workouts/create'
      } 
    },
    myPrograms: {
      onClick: {
        func: async () =>  { 
          'use server';
          console.log('erez!')
        }
      } 
    }
  }

  const redirectToCreate = () => redirect('/create');
  return (
    <div>
       <div>
        <h2>My Programs</h2>
        <PRButton onAction={clickHandlers.myPrograms}>Create</PRButton>
      </div>
      <div>
       Create a workout program
        <PRButton onAction={clickHandlers.create}>Create</PRButton>
      </div>
    </div>
  )
}

export default Workouts
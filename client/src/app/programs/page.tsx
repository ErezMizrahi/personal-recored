import { getServerSession } from 'next-auth'
import React from 'react'
import AutoSignIn from '../components/auth/AutoSignIn';
import { Headline, Section, SubHeadline } from '../components/styled/Section.styled';
import { authOptions } from '../api/auth/[...nextauth]/route';
import nextFetch from '../api/next-fetch';
import List from '../components/ui/List';
import PRButton from '../components/ui/PRButton';

const Programs = async () => {
  const session = await getServerSession();
  if(!session || !session.user) {
    return <AutoSignIn />;
  }

  // const clickHandlers = {
  //   create: {
  //     onClick: {
  //       redirect: '/workouts/create'
  //     } 
  //   },
  //   myPrograms: {
  //     onClick: {
  //       func: async () =>  { 
  //         'use server';
  //         console.log('erez!')
  //       }
  //     } 
  //   }
  // }

  // const redirectToCreate = () => redirect('/create');



  const getPrograms = async () => {
    const session = await getServerSession(authOptions);
    if(session?.user) {
        const request = await nextFetch({
            service: 'programs',
            route: '/api/programs/current',
            method: 'get',
            headersMap: {
                'Authorization': `Bearer ${session?.user.idToken}`
             }
        });

        if(request.ok) {
            return await request.json();
        }
    }
}

const programs = await getPrograms();
console.group('programs', programs);

  return (
    <div>
       {programs?.length > 0 && 
        <Section>
          <Headline> My Programs </Headline>
          <List array={programs} />
          {/* <PRButton onAction={clickHandlers.myPrograms}>Create</PRButton> */}
        </Section>
      }
      <Section>
        <Headline> Create Programs </Headline>
        <p>you can choose to create a custom program or use one of our templates</p>
        <PRButton>Create</PRButton>

        <Section>
          <SubHeadline> Templates </SubHeadline>
          <p>a template is just a blueprint. you can customize it a you wish.</p>
        </Section>

      </Section>
    </div>
  )
}

export default Programs
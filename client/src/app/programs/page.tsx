import { getServerSession } from 'next-auth'
import React from 'react'
import AutoSignIn from '../components/auth/AutoSignIn';
import { Headline, SubHeadline } from '../components/styled/Section.styled';
import { authOptions } from '../api/auth/[...nextauth]/route';
import nextFetch from '../api/next-fetch';
import List from '../components/ui/List';
import PRButton from '../components/ui/PRButton';
import { Section } from '../components/styled/Container.styled';

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
            route: '/api/programs',
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

const getTemplates = async () => {
  const session = await getServerSession(authOptions);
  if(session?.user) {
      const request = await nextFetch({
          service: 'programs',
          route: '/api/programs/templates',
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
const templates = await getTemplates();

  return (
    <div>
       {programs?.length > 0 && 
        <Section>
          <Headline> My Programs </Headline>
          <List array={programs} />
        </Section>
      }
      <Section>
        <Headline> Create Programs </Headline>
        <p>you can choose to create a custom program or use one of our templates</p>
        <PRButton>Create</PRButton>

        {templates?.length > 0 && 
          <Section>
            <SubHeadline> Templates </SubHeadline>
            <p>a template is just a blueprint. you can customize it a you wish.</p>
            <List array={templates} />
          </Section>
        }
      </Section>
    </div>
  )
}

export default Programs
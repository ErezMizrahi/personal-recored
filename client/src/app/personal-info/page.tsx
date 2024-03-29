import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import nextFetch from '../api/next-fetch';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { CenteredDiv, CenteredImage } from '../components/styled/CenteredContainer.styled';
import Image from 'next/image';

const PersonalInfo = async () => {
  const session = await getServerSession(authOptions);
  if(!session || !session.user) {
    redirect('/');
  }

  const getPersonalInformation = async () => {
    const res = await nextFetch({
      service: 'auth',
      route: '/api/users/me',
      headersMap: {
        'Authorization': `Bearer ${session.user.idToken}`
      }
    });

    if(res.ok) {
      const json = await res.json();
      console.log(json)
      return json;
    } 
  }

  const { firstName, lastName, age, gender, height, weight } = await getPersonalInformation();

  return (
    <CenteredDiv>
      <CenteredImage>
        <Image src={session.user.image} height={100} width={100} alt='profile image'
         style={{borderRadius: '50%', border: '10px solid #e9f0f4'}}
         />
      </CenteredImage>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{age}</p>
        <p>{gender}</p>
        <p>{height}</p>
        <p>{weight}</p>
      </CenteredDiv>
  )
}

export default PersonalInfo
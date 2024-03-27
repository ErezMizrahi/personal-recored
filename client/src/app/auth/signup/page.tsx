import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import SignUpForm from '../../components/forms/SignUpForm';
import styles from './signup.module.css';
import { FormContainer } from '../../components/styled/FormContainer.styled';
import { Headline } from '../../components/styled/Section.styled';

const Signup = async () => {
    const session = await getServerSession(authOptions);
    if(!session?.user) {
        redirect('/api/auth/login')
    }

  return (
    <>
      <Headline>Welcome to personal recored!</Headline>
      <p>please fill the following details to get started</p>
      <br/>
      <FormContainer>
        <SignUpForm />
      </FormContainer>
    </>
    )
}

export default Signup
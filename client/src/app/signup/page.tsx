import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import SignUpForm from '../components/forms/SignUpForm';
import styles from './signup.module.css';

const Signup = async () => {
    const session = await getServerSession(authOptions);
    if(!session?.user) {
        redirect('/api/auth/login');
    }

  return (
    <div className={styles.formContainer}>
      <SignUpForm />
    </div>
  )
}

export default Signup
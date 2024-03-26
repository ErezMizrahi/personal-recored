import { revalidatePath } from 'next/cache';
import nextFetch from '@/app/api/next-fetch';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { RedirectType, redirect } from 'next/navigation';
import { CButton } from '../styled/CButton.styled';
import { Form, FormInput } from '../styled/FormContainer.styled';

const SignUpForm = () => {

  const submitSignupForm = async (formData: FormData) => {
    'use server';
    const body = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      gender: formData.get('gender'),
      age: formData.get('age'),
      weight: formData.get('weight'),
      height: formData.get('height')
    }

    const session = await getServerSession(authOptions);
    if(session?.user) {
      const res = await nextFetch({
            service: 'auth',
            route: '/api/users/signup',
            method: 'post',
            headersMap: {
              'Authorization': `Bearer ${session?.user.idToken}`
            },
            body
          });


      if(res.ok) {
        revalidatePath('/', 'layout');
        redirect('/auth/signin', RedirectType.replace);
      }

      if(res.status === 400) {
        //handle errors
      }

      if(res.status === 401) {
        revalidatePath('/', 'layout');
        redirect('/auth/signout', RedirectType.replace);
      }
    }

    revalidatePath('/signup');
  }
      return (
        <Form action={submitSignupForm}>
            <label htmlFor='firstName'>First Name</label>
            <FormInput type="text" name="firstName" />

            <label htmlFor='lastName'>Last Name</label>
            <FormInput type="text" name="lastName" />

            <label htmlFor='gender'>Gender</label>
            <select name='gender'>
              <option value={'male'}>Male</option>  
              <option value={'female'}>Female</option>  
            </select>

            <label htmlFor='age'>Age</label>
            <FormInput type="text" name="age" />

            <label htmlFor='weight'>Current Weight</label>
            <FormInput type="text" name="weight" />

            <label htmlFor='height'>Height</label>
            <FormInput type="text" name="height" />

            {/* <button type="submit">Submit</button> */}
            <CButton style={{width: 80}} type='submit'>Submit</CButton>
        </Form>
      )
}

export default SignUpForm
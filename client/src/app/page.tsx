import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { MainContainer } from './components/styled/MainContainer.styled';
import AutoSignIn from './components/auth/AutoSignIn';
import { Container } from './components/styled/Container.styled';


export default async function Home() {
  const session = await getServerSession(authOptions);
  if(!session || !session.user) {
    return <AutoSignIn />;
  }
  
  const isNew = session?.user.isNew;
  console.log('isNew', session?.user);
  if(isNew) {
    redirect('/auth/signup');
  }


  return (
    <Container>
      <h1>welcome { session?.user?.name } ... { session?.user.isNew ? 'true' : 'false'} </h1>
    </Container>
  )
}

import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { MainContainer } from './components/styled/MainContainer.styled';


export default async function Home() {
  const session = await getServerSession(authOptions);

  const isNew = session?.user.isNew;
  if(isNew) {
    redirect('/signup');
  }

  console.log(session?.user.idToken)

  return (
    <MainContainer>
      <h1>welcome { session?.user?.name } ... { session?.user.isNew ? 'true' : 'false'} </h1>
    </MainContainer>
  )
}

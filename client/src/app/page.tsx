import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { MainContainer } from './components/styled/MainContainer.styled';
import AutoSignIn from './components/auth/AutoSignIn';
import { Container, DashboardContainer } from './components/styled/Container.styled';
import { Card } from './components/styled/Card.styled';
import { Headline } from './components/styled/Section.styled';


export default async function Home() {
  const session = await getServerSession(authOptions);
  if(!session || !session.user) {
    return <AutoSignIn />;
  }
  
  const isNew = session?.user.isNew;
  if(isNew) {
    redirect('/auth/signup');
  }


  return (
    <Container>
      <Headline>Track your progress!</Headline>
      <DashboardContainer>
        <Card width={0} height={0} />
        <Card width={0} height={0} />
        <Card width={0} height={0} />
        <Card width={0} height={0} />
        <Card width={0} height={0} />
        <Card width={0} height={0} />
      </DashboardContainer>
    </Container>
    )
}

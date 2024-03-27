import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from './components/SessionProvider';
import { getServerSession } from 'next-auth';
import StyledComponentsRegistry from './lib/registry'
import { MainContainer } from './components/styled/MainContainer.styled';
import { Container } from './components/styled/Container.styled';
import NavigationMenu from './components/NavigationMenu';
import Theme from './lib/Theme';
import { authOptions } from './api/auth/[...nextauth]/route';
import BreadCrumbs from './components/ui/BreadCrumbs';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personal Recored'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session =  await getServerSession(authOptions);

  const getLayoutBasedOnSession = () => {
    //not a new user
    if(session && !session.user.isNew) {
      return <>
            <NavigationMenu/> 
            <Container>
              <BreadCrumbs/> 
              {children}
            </Container>
      </>
      }

      //new user
      return <>
         <Container>
           {children}
         </Container>
      </>
  }

  return (
    <html lang="en">
      <body>
        <Theme>
          <StyledComponentsRegistry>
            <MainContainer $loggedin={!session?.user?.isNew} className={inter.className}>
                <SessionProvider session={session}> 
                { getLayoutBasedOnSession() }
                </SessionProvider> 
            </MainContainer>
          </StyledComponentsRegistry>
        </Theme>
        </body>
    </html>
  )
}

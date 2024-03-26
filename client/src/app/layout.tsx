import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from './components/SessionProvider';
import { getServerSession } from 'next-auth';
import styles from './page.module.css'
import StyledComponentsRegistry from './lib/registry'
import { MainContainer } from './components/styled/MainContainer.styled';
import { Container } from './components/styled/Container.styled';
import NavigationMenu from './components/NavigationMenu';
import Theme from './lib/Theme';
import BreadCrumbs from './components/BreadCrumbs';
import { authOptions } from './api/auth/[...nextauth]/route';

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
          <div style={{flex:1}}>
            <Container>
              <BreadCrumbs/> 
              {children}
            </Container>
          </div>
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
      <body className={`${inter.className} ${styles.main}`}>
        <Theme>
          <MainContainer className={inter.className}>
            <StyledComponentsRegistry>
              <SessionProvider session={session}> 
              { getLayoutBasedOnSession() }
              </SessionProvider> 
            </StyledComponentsRegistry>
          </MainContainer>
        </Theme>
        </body>
    </html>
  )
}

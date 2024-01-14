import { CenteredContainer } from '../components/styled/CenteredContainer.styled';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <CenteredContainer>
          {children}
      </CenteredContainer>
  )
}

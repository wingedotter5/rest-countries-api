import { ReactNode } from 'react'
import styled from 'styled-components'

import TopBar from '@/components/TopBar'
import { Theme, useAppContext } from '@/contexts/AppContext'
import { colors } from '@/theme'

interface StyledComponentProps {
  theme: Theme
}

const Container = styled.div<StyledComponentProps>`
  background-color: ${(props) =>
    props.theme === 'light' ? colors.white : colors.veryDarkBlue1};
  min-height: 100vh;
`

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  const { theme } = useAppContext()

  return (
    <Container theme={theme}>
      <TopBar />
      <>{children}</>
    </Container>
  )
}
export default Layout

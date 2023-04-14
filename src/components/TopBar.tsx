import styled from 'styled-components'
import Link from '@/components/Link'
import { colors } from '@/theme'
import { Theme, useAppContext } from '@/contexts/AppContext'

interface StyledComponentProps {
  theme: Theme
}
const Header = styled.header<StyledComponentProps>`
  background-color: ${(props) =>
    props.theme === 'light' ? colors.white : colors.darkBlue};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`

const Title = styled.h1<StyledComponentProps>`
  font-size: 2rem;
  color: ${(props) =>
    props.theme === 'light' ? colors.veryDarkBlue2 : colors.white};

  @media screen and (max-width: 375px) {
    font-size: 1rem;
  }
`

const Button = styled.button<StyledComponentProps>`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  color: ${(props) =>
    props.theme === 'light' ? colors.veryDarkBlue2 : colors.white};
  display: flex;
  gap: 10px;
  align-items: center;
`

const TopBar = () => {
  const { theme, toggleTheme } = useAppContext()

  return (
    <Header theme={theme}>
      <Container className="container">
        <Link href="/">
          <Title theme={theme}>Where in the world?</Title>
        </Link>
        <Button onClick={toggleTheme} theme={theme}>
          <img src={theme === 'light' ? '/images/icon-night-moon.svg' : '/images/icon-sun.svg'} alt="" />
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </Container>
    </Header>
  )
}
export default TopBar

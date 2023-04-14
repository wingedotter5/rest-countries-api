import * as React from 'react'
import styled from 'styled-components'
import { Theme } from '@/contexts/AppContext'
import { colors } from '@/theme'

interface StyledComponentProps {
  theme: Theme
}

const Container = styled.div<StyledComponentProps>`
  display: flex;
  align-items: center;
  font-size: 1rem;
  background-color: ${(props) =>
    props.theme === 'light' ? colors.white : colors.darkBlue};
  color: ${(props) =>
    props.theme === 'light' ? colors.darkGray : colors.white};
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  width: 250px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`

const Value = styled.div<StyledComponentProps>`
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  text-transform: capitalize;

  &::after {
    position: absolute;
    content: '';
    border-style: solid;
    border-width: 5px;
    border-color: ${(props) =>
        props.theme === 'light' ? colors.darkBlue : colors.white}
      transparent transparent transparent;
    right: 1rem;
    top: calc(50% - 5px);
  }
`

const Expand = styled.div<StyledComponentProps>`
  list-style-type: none;
  position: absolute;
  top: calc(100% + 10px);
  width: 100%;
  background-color: ${(props) =>
    props.theme === 'light' ? colors.white : colors.darkBlue};
  border-radius: 6px;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

  > li {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`

interface Option {
  label: string
  value: string
}

interface FilterProps {
  theme: Theme
  options: Option[]
  value: string
  onChange: (text: string) => void
}
const Filter = ({ theme, options, value, onChange }: FilterProps) => {
  const [toggled, setToggled] = React.useState(false)

  const toggle = () => {
    setToggled((prevToggled) => !prevToggled)
  }

  return (
    <Container theme={theme} onClick={toggle}>
      <Value theme={theme}>{value === '' ? 'Filter by Region' : value}</Value>
      {toggled && (
        <Expand theme={theme}>
          {options.map((option) => (
            <li key={option.value} onClick={() => onChange(option.value)}>
              {option.label}
            </li>
          ))}
        </Expand>
      )}
    </Container>
  )
}
export default Filter

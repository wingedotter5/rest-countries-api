import * as React from 'react'
import styled from 'styled-components'
import { colors } from '@/theme'
import { Theme } from '@/contexts/AppContext'

interface StyledComponentProps {
  theme: Theme
}

const StyledComponent = styled.input<StyledComponentProps>`
  background-image: ${(props) =>
    props.theme === 'light'
      ? `url(/rest-countries-api/images/icon-search-dark.svg)`
      : `url(/rest-countries-api/images/icon-search-light.svg)`};
  background-repeat: no-repeat;
  background-position: 2rem center;
  background-color: ${(props) =>
    props.theme === 'light' ? colors.white : colors.darkBlue};
  color: ${(props) =>
    props.theme === 'light' ? colors.darkGray : colors.white};
  padding: 1.25rem 5rem;
  font-size: 1rem;
  outline: none;
  border: none;
  width: 100%;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

  max-width: 500px;

  &::placeholder {
    color: ${(props) =>
      props.theme === 'light' ? colors.darkGray : colors.white};
  }
`

interface SearchBarProps {
  theme: Theme
  searchText: string
  updateSearchText: (text: string) => void
  actionHandler: () => void
}
const SearchBar = ({
  theme,
  searchText,
  updateSearchText,
  actionHandler,
}: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchText(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      actionHandler()
    }
  }

  return (
    <StyledComponent
      theme={theme}
      type="text"
      value={searchText}
      onChange={handleChange}
      placeholder="Search for a country..."
      onKeyDown={handleKeyDown}
    />
  )
}
export default SearchBar

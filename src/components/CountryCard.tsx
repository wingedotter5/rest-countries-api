import styled from 'styled-components'
import Image from 'next/image'
import { Country, Theme } from '@/contexts/AppContext'
import { colors } from '@/theme'

interface StyledComponentProps {
  theme: Theme
}
const StyledComponent = styled.article<StyledComponentProps>`
  border-radius: 6px;
  overflow: hidden;
  background-color: ${(props) =>
    props.theme === 'light' ? colors.white : colors.darkBlue};
  color: ${(props) =>
    props.theme === 'light' ? colors.darkBlue : colors.white};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`

const CountryInfo = styled.div`
  padding: 1rem 2rem 3rem 2rem;
  display: grid;
  grid-template-rows: repeat(4, auto);
  row-gap: 10px;
  align-items: center;

  > h3 {
    margin: 1rem 0;
  }

  > p {
    font-weight: 600;

    > span {
      color: ${colors.darkGray};
    }
  }
`

interface CountryCardProps {
  country: Country
  theme: Theme
}
const CountryCard = ({ country, theme }: CountryCardProps) => {
  return (
    <StyledComponent theme={theme}>
      <Image
        src={country.flags.svg}
        alt={`flag of ${country.name.official}`}
        width={0}
        height={0}
        style={{ objectFit: 'cover', width: '100%', height: '200px' }}
      />
      <CountryInfo>
        <h3>{country.name.official}</h3>
        <p>
          Population: <span>{country.population.toLocaleString('en-US')}</span>
        </p>
        <p>
          Region: <span>{country.region}</span>
        </p>
        <p>
          Capital: <span>{country.capital}</span>
        </p>
      </CountryInfo>
    </StyledComponent>
  )
}
export default CountryCard

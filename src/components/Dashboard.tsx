import styled from 'styled-components'
import useSWR from 'swr'

import SearchBar from '@/components/SearchBar'
import Filter from '@/components/Filter'
import Flex from '@/components/Flex'
import { Country, useAppContext } from '@/contexts/AppContext'
import Box from '@/components/Box'
import Link from '@/components/Link'
import CountryCard from '@/components/CountryCard'

const CountriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 5rem;
  padding-bottom: 4rem;
`

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const json = await res.json()

  if (!res.ok) {
    const error = new Error(`${json.message}`)
    throw error
  }

  return json
}

const options = [
  { label: 'Africa', value: 'africa' },
  { label: 'America', value: 'america' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'Oceania', value: 'oceania' },
]

const Dashboard = () => {
  const {
    theme,
    region,
    searchText,
    fetchUrl,
    updateSearchText,
    updateRegion,
    searchActionHandler,
  } = useAppContext()

  const {
    data: countries,
    isLoading,
    error,
  } = useSWR<Country[] | null>(fetchUrl, fetcher)

  return (
    <>
      <Box className="container" margin="3rem auto">
        <Flex justify="space-between" wrap="wrap" gap="1rem">
          <SearchBar
            searchText={searchText}
            updateSearchText={updateSearchText}
            theme={theme}
            actionHandler={searchActionHandler}
          />
          <Filter
            theme={theme}
            options={options}
            value={region}
            onChange={updateRegion}
          />
        </Flex>
      </Box>
      <Box className="container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {error ? (
              <div>{error.message}</div>
            ) : (
              <CountriesList>
                {countries?.map((country) => (
                  <Link
                    key={country.name.official}
                    href={`/${country.name.common}`}
                  >
                    <CountryCard country={country} theme={theme} />
                  </Link>
                ))}
              </CountriesList>
            )}
          </>
        )}
      </Box>
    </>
  )
}
export default Dashboard

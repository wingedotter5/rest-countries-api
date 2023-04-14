import * as React from 'react'
import styled from 'styled-components'
import { usePathname, useRouter } from 'next/navigation'
import useSWR from 'swr'
import Head from 'next/head'

import Layout from '@/components/Layout'
import Link from '@/components/Link'
import { colors } from '@/theme'
import { BASE_URL, Country, Theme, useAppContext } from '@/contexts/AppContext'

interface StyledComponentProps {
  theme: Theme
}

const Container = styled.div<StyledComponentProps>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  font-size: 1rem;
  color: ${(props) =>
    props.theme === 'light' ? colors.darkBlue : colors.white};

  > img {
    max-width: 100%;
  }

  @media screen and (max-width: 375px) {
    grid-template: auto auto / auto;
    gap: 2rem;
  }
`

const Info = styled.div`
  > h3 {
    margin-bottom: 1.5rem;
  }

  > div {
    &:nth-child(1),
    &:nth-child(2) {
      display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;

    p {
      font-weight: 600;
      margin-bottom: 1rem;
      > span {
        color: ${colors.darkGray};
      }
    }

    @media screen and (max-width: 375px) {
      grid-template: auto auto / auto;
      gap: 2rem;
    }
  }
`

const BorderCountries = styled.div`
  margin: 1.5rem 0;

  > span {
    font-weight: 600;
    margin-right: 1rem;
  }
`

const BorderCountriesList = styled.div<StyledComponentProps>`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 1rem;

  > span {
    color: ${(props) =>
      props.theme === 'light' ? colors.darkBlue : colors.white};
    background-color: ${(props) =>
      props.theme === 'light' ? colors.white : colors.darkBlue};
    padding: 0.25em 2em;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
`

const BackButton = styled.button<StyledComponentProps>`
  background-color: ${(props) =>
    props.theme === 'light' ? colors.white : colors.darkBlue};
  color: ${(props) =>
    props.theme === 'light' ? colors.darkBlue : colors.white};
  display: inline-block;
  padding: 1em 2em;
  border-radius: 6px;
  margin: 2rem 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`

const Box = styled.div`
  height: 100%;
  display: grid;
  place-content: center;
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

const DetailPage = () => {
  const countryName = usePathname()
  const { data, error, isLoading } = useSWR<Country[] | null>(
    `${BASE_URL}/name${countryName}?fullText=true`,
    fetcher
  )
  const country = data && data[0]
  const router = useRouter()
  const { theme } = useAppContext()

  return (
    <Layout>
      <Head>
        {/* <title>REST Countries API - {country.name.official}</title> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <BackButton theme={theme} onClick={() => router.back()}>
          <img src={theme === 'light' ? '/images/icon-arrow-left-dark.svg' : '/images/icon-arrow-left-light.svg'} alt='left arrow' /> Back
        </BackButton>
      </div>
      <Container theme={theme} className="container">
        {error ? (
          <div>{error.message}</div>
        ) : (
          <>
            <img src={country?.flags.svg} alt="" />
            <Info>
              <h3>{country?.name.official}</h3>
              <div>
                <div>
                  <p>
                    Native Name: <span>{country?.name.official}</span>
                  </p>
                  <p>
                    Population:{' '}
                    <span>{country?.population.toLocaleString('en-US')}</span>
                  </p>
                  <p>
                    Region: <span>{country?.region}</span>
                  </p>
                  <p>
                    Sub Region: <span>{country?.subregion}</span>
                  </p>
                  <p>
                    Capital: <span>{country?.capital[0]}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Top Level Domain: <span>{country?.tld}</span>
                  </p>
                  <p>
                    Currencies:{' '}
                    <span>
                      {Object.keys(country?.currencies ?? []).join(', ')}
                    </span>
                  </p>
                  <p>
                    Languages:{' '}
                    <span>
                      {Object.values(country?.languages ?? []).join(', ')}
                    </span>
                  </p>
                </div>
              </div>
              {country?.borders?.length && (
                <BorderCountries>
                  <span>Border Countries:</span>
                  <BorderCountriesList theme={theme}>
                    {country?.borders.map((countryCode) => (
                      <span key={countryCode}>{countryCode}</span>
                    ))}
                  </BorderCountriesList>
                </BorderCountries>
              )}
            </Info>
          </>
        )}
      </Container>
    </Layout>
  )
}
export default DetailPage

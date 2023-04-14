import * as React from 'react'
import { responseItem } from '@/constants'

export type Country = typeof responseItem
export type Theme = 'light' | 'dark'
export const BASE_URL = 'https://restcountries.com/v3.1'

interface Context {
  searchText: string
  region: string
  theme: Theme
  fetchUrl: string
  updateSearchText: (text: string) => void
  updateRegion: (text: string) => void
  searchActionHandler: () => void
  toggleTheme: () => void
}
const AppContext = React.createContext<Context | null>(null)

interface AppContextProviderProps {
  children: React.ReactNode
}
const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [searchText, setSearchText] = React.useState('')
  const [region, setRegion] = React.useState('')
  const [fetchUrl, setFetchUrl] = React.useState(`${BASE_URL}/all`)
  const [theme, setTheme] = React.useState<Theme>('light')

  React.useEffect(() => {
    if (region !== '') {
      setSearchText('')
      setFetchUrl(`${BASE_URL}/region/${region}`)
    }
  }, [region])

  const updateSearchText = (text: string) => {
    setSearchText(text)
  }

  const updateRegion = (text: string) => {
    setRegion(text)
  }

  const searchActionHandler = () => {
    if (searchText.trim() !== '') {
      setFetchUrl(`${BASE_URL}/name/${searchText}`)
      setRegion('')
    } else {
      setFetchUrl(`${BASE_URL}/all`)
    }
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <AppContext.Provider
      value={{
        searchText,
        region,
        theme,
        fetchUrl,
        updateSearchText,
        updateRegion,
        searchActionHandler,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppContextProvider

export const useAppContext = () => {
  const {
    searchText,
    region,
    theme,
    fetchUrl,
    updateSearchText,
    updateRegion,
    searchActionHandler,
    toggleTheme,
  } = React.useContext(AppContext) as Context

  return {
    searchText,
    region,
    theme,
    fetchUrl,
    updateSearchText,
    updateRegion,
    searchActionHandler,
    toggleTheme,
  }
}

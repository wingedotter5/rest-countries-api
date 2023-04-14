import type { AppProps } from 'next/app'

import '@/styles/globals.css'
import AppContextProvider from '@/contexts/AppContext'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
export default App

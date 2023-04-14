import Head from 'next/head'

import Layout from '@/components/Layout'
import Dashboard from '@/components/Dashboard'

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>REST Countries API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </Layout>
  )
}
export default Home

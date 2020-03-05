import React from 'react'
import Head from 'next/dist/next-server/lib/head'
import SearchBarView from './SearchBarView'

const MainLayout = ({children}) => {
  return (
    <div>
      <Head>
        <title>Mercado Livre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchBarView/>

      {children}
    </div>
  )
}

export default MainLayout

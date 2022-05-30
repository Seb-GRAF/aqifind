import Nav from './nav'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Air quality</title>
      </Head>
      <Nav />
      {children}
    </>
  )
}

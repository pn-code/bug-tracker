import Head from 'next/head'
import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <>
      <Head>
        <title>Bug Tracker</title>
        <meta name="description" content="Track issues with ease!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
    </>
  )
}

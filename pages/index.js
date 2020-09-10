import Head from 'next/head'
import { Composition } from 'atomic-layout'

import Posts from '../features/blog/Posts'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Composition
        as="main"
        height="100%"
        alignContent="center"
        justifyItems="center"
      >
        <Posts/>
      </Composition>
    </>
  )
}

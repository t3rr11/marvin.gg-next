import Head from 'next/head';

export default function Home({ clans }) {
  return (
    <div>
      <Head>
        <title>Marvin.gg</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home Page</h1>
    </div>
  )
}
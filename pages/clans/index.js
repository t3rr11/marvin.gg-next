import Head from 'next/head';
import ClanList from '../../components/ClanList';

export default function Home({ clans }) {
  return (
    <div>
      <Head>
        <title>Company Name</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Index</h1>
      <ClanList clans={clans} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`https://api.marvin.gg/GetAllClans`)
  const clans = await res.json();

  return {
    props: { clans: clans.data }
  }
}
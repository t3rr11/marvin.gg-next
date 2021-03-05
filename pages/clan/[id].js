import Link from 'next/link';

const clan = ({ clan }) => {
  return (
    <>
      <h1>{ clan.clanName }</h1>
      <h1>Members: { clan.memberCount }</h1>
      <br />
      <Link href="/">Go Back</Link>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const res = await fetch(`https://api.marvin.gg/GetClan?clanID=${context.params.id}`)
  const clan = await res.json();

  return {
    props: {
      clan: clan.data[0]
    }
  }
}

export default clan

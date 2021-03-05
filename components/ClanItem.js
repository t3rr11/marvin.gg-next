import Link from 'next/Link';
import clanStyle from '../styles/Clan.module.css';

const ClanItem = ({ clan }) => {
  return (
    <Link href="/clan/[id]" as={`/clan/${clan.clanID}`}>
      <a className={clanStyle.card}>
        <h3>{clan.clanName} &rarr;</h3>
        <p>Members: {clan.memberCount}</p>
      </a>
    </Link>
  )
}

export default ClanItem

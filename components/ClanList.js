import ClanItem from './ClanItem';
import clanStyles from '../styles/Clan.module.css';

const ClanList = ({ clans }) => {
  return (
    <div className={clanStyles.grid}>
      {clans.map((clan) => (
        <ClanItem clan={clan} />
      ))}
    </div>
  )
}

export default ClanList

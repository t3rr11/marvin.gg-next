import Nav from './Nav';
import styles from '../styles/Layout.module.css';

const Layout = ({ children, backgrounds }) => {
  return (
    <>
      <Nav backgrounds={backgrounds} />
      <div className={styles.contaniner}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout

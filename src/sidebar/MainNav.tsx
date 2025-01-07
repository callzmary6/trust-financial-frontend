
import styles from '../styles/views/MainNav.module.scss';
import NavItemGroup from './NavItemGroup';


const MainNav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.nav__fake}></div>
      <NavItemGroup 
        text="Dashboard" 
        toRoute="dashboard" 
        />

        <NavItemGroup 
          text="Deposit" 
          toRoute="deposit" 
        />

        <NavItemGroup 
          text="Mega Bonus" 
          toRoute="mega-bonus" 
        />


        <NavItemGroup 
          text="Withdraw" 
          toRoute="withdraw" 
        />

        <NavItemGroup 
          text="Profile" 
          toRoute="profile" 
        />
    </div>
  );
};

export default MainNav;
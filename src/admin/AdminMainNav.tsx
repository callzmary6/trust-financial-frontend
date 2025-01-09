
import NavItemGroup from '../sidebar/NavItemGroup';
import styles from '../styles/views/MainNav.module.scss';


const AdminMainNav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.nav__fake}></div>
      <NavItemGroup 
        text="Deposits" 
        toRoute="dashboard" 
        />

        <NavItemGroup 
          text="Withdrawals" 
          toRoute="admin-withdraw" 
        />

        <NavItemGroup 
          text="Users" 
          toRoute="admin-users" 
        />
    </div>
  );
};

export default AdminMainNav;
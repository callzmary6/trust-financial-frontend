import { Outlet } from 'react-router-dom';
import styles from '../styles/views/AppLayout.module.scss';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';


const AppLayout = () => {
  
  return (
    <div className={styles.appLayout}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.mainContent}>
          <Outlet />
        </div>
    </div>
  );
};

export default AppLayout;

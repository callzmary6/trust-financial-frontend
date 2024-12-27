import { useNavigate } from 'react-router-dom';
import styles from '../styles/views/NavItemGroup.module.scss';
import useNavStore from '../store/NavStore';

interface NavItemGroupProps {
  text: string;
  toRoute: string;
}

const NavItemGroup = ({ text, toRoute }: NavItemGroupProps) => {
  const navigate = useNavigate();
  const setActiveSideNav = useNavStore((state) => state.setActiveSideNav);
  const activeSideNav = useNavStore((state) => state.activeSideNav);
  const isActive = activeSideNav === toRoute;

  const handleNavClick = () => {
    setActiveSideNav(toRoute);
    navigate(toRoute);
  };

  console.log(activeSideNav);

  return (
    <div className={`${styles.cont} ${isActive? styles.active : ""}`}
      onClick={handleNavClick}
    >
      <div className={styles.cont__text}>
        {text}
      </div>
    </div>
);
};

export default NavItemGroup;
9
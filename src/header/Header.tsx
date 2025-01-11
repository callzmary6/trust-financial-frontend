
import styles from "../styles/views/Header.module.scss";
import Logout from "../components/Logout";
import { useAuth } from "../context/AuthContext";
import MenuIcon from "../components/MenuIcon";

function Header() {
    const {logout} = useAuth();
    
    function handleLogout() {
        logout();
    }

    return (
        <div className={styles.cont}>
            <MenuIcon />
            <div className={styles.cont_login}>
                <button>
                    <Logout handleLogout={handleLogout}/>
                </button>
            </div>
        </div>
    )
}

export default Header;
import { useNavigate } from "react-router";
import styles from "../styles/views/Header.module.scss";
import Logout from "../components/Logout";
import { useAuth } from "../context/AuthContext";

function Header() {
    const navigate = useNavigate();
    const {logout} = useAuth();
    function handleLogout() {
        // setSidebarVisible(false);
        logout();
      }
    return (
        <div className={styles.cont}>
            <div className={styles.cont_login}>
                <button>
                    <Logout handleLogout={handleLogout}/>
                </button>
            </div>
        </div>
    )
}

export default Header;
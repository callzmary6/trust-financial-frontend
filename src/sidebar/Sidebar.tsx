// import MainNav from "./MainNav";
import AdminMainNav from "../admin/AdminMainNav";
import { useAuth } from "../context/AuthContext";
import s from "../styles/views/Sidebar.module.scss";
import MainNav from "./MainNav";

function Sidebar() {
    const {user} = useAuth();
    return (
        <>
            <div className={s.dash_title}>AcunarTech</div>
            <div className={s.sidebar}>
                {user?.user.email !== "keengsleyudeh@gmail.com" && <MainNav />}
                {user?.user.email === "keengsleyudeh@gmail.com" && <AdminMainNav />}
            </div>
        </>
    )
}

export default Sidebar;
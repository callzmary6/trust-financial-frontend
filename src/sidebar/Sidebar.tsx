// import MainNav from "./MainNav";
import s from "../styles/views/Sidebar.module.scss";
import MainNav from "./MainNav";

function Sidebar() {
    return (
        <>
            <div className={s.dash_title}>AccunarTech</div>
            <div className={s.sidebar}>
                <MainNav />
            </div>
        </>
    )
}

export default Sidebar;
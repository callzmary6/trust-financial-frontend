import { useState } from "react";
import "../styles/components/MenuIcon.scss";
import useSideStore from "../store/SideStore";

export default function MenuIcon() {
    const isSideBarOpen = useSideStore((state)=>state.isSidebarOpen)
    const setSidebarVisible = useSideStore((state)=>state.toggleSidebar)
    const [open, setIsOpen] = useState(false);
      const toggleSidebar =  () => {
        setIsOpen((open)=>!open);
        setSidebarVisible();
      };
      console.log(open);
    return (
        <div className="hamburger_container">
            <button 
            type="button"
            className={`hamburger_button hamburger ${isSideBarOpen ? 'open' : ''}`}
            onClick={toggleSidebar}
            >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
            </button>
        </div>
    )
}
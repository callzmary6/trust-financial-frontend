import { useNavigate } from "react-router";
import "../styles/components/Navbar.scss";

function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="navbar_cont">
            <div className="image">
                <img src="https://perzillonlimited.com/assets/img/logo.png" alt="" />
            </div>
            <div className="tabs">Home</div>
            <div className="tabs">About</div>
            <div className="tabs">Contact us</div>
            <div className="login">
                <button onClick={()=>navigate("/login")}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Navbar;
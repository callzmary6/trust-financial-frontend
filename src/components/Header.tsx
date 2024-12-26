// import { BiMailSend } from "react-icons/bi";
// import "../styles/components/Header.scss";

// function Header() {
//     return (
//         <div className="header_cont">
//             <div className="email">
//                 <div className="email_icon">
//                     <BiMailSend />
//                 </div>
//                 <div className="email_address">admin@perzillonlimited.com</div>
//             </div>

//             <div>
//                 Powered by Google
//             </div>
//         </div>
//     )
// }

// export default Header;



// src/components/Header.jsx
import { BiMailSend } from "react-icons/bi";
import "../styles/components/Header.scss";

function Header() {
  return (
    <header className="header_cont">
      <div className="email">
        <div className="email_icon" aria-label="Email Icon">
          <BiMailSend />
        </div>
        <div className="email_address">admin@perzillonlimited.com</div>
      </div>

      <div className="powered_by">
        Powered by Google
      </div>
    </header>
  );
}

export default Header;
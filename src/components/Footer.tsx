
import "../styles/components/Footer.scss";

function Footer() {
    return (
    <footer className="footer">
        <div className="footer_container">
            <div className="info">
                {/* <h2>___</h2> */}
                <p>
                    Address: David Withell Ltd, Unit 13, 1 Stark Drive, Wigram, Christchurch, 8042, New Zealand
                </p>
                <p>Phone: +1 (123) 456-7890</p>
                <p>Email: admin@accunartechlimited.com</p>
            </div>
            <div className="copyright">
            &copy; 2024 AccunarTech Limited. All Rights Reserved.
            </div>
        </div>
    </footer>
    )
}

export default Footer;
import AfterHero from "../components/AfterHero";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Information from "../components/Information";
import MoreInfo from "../components/MoreInfo";
import Navbar from "../components/Navbar";
import Ticker from "../components/Ticker";
import { useAuth } from "../context/AuthContext";

import "../styles/pages/HomeLayout.scss";


function HomeLayout() {
    const {isAuthenticated} = useAuth();
    console.log(isAuthenticated);
    return (
        <div className="cont">
            <Header />
            <Navbar />
            <Hero />
            <Ticker />
            <AfterHero />
            <MoreInfo />
            <Information />
            <Footer />
        </div>
    )
}

export default HomeLayout;
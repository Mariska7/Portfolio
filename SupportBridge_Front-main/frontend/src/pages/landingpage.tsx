import { ParallaxProvider } from 'react-scroll-parallax';
import LandingpageHeader from "../components/landingspagecomponents/headerlandingpage/header";
import FirstScreen from "../components/landingspagecomponents/firstscreenlandingpage/firstscreen";
import ParallaxEffect from "../components/landingspagecomponents/parallaxeffectlandingpage/parallax";
import ChooseRolePage from "../components/landingspagecomponents/chooserolelandingpage/chooserolepage";
import FooterPage from "../components/landingspagecomponents/footerlandingpage/footerpage.jsx";



const LandingPage = () => {
    return (
        <ParallaxProvider>
            <LandingpageHeader />
            <FirstScreen />
            <ParallaxEffect />
            <ChooseRolePage />
            <FooterPage />

        </ParallaxProvider>
    );
};

export default LandingPage;

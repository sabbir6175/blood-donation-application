import About from "./About";
import Banner from "./Banner";
import ContactUs from "./ContactUs";
import Featured from "./Featured";
import Gallery from "./gallery";
import Member from "./Member";
import Process from "./Process";
import Stats from "./Stats";
import Step from "./Step";



const Home = () => {
    return (
       <>
            <Banner></Banner>
            <About></About>
            <Step></Step>
            <Process></Process>
            <Stats></Stats>
            <Member></Member>
            <Featured></Featured>
            <Gallery></Gallery>
            <ContactUs></ContactUs>
       </>
    );
};

export default Home;
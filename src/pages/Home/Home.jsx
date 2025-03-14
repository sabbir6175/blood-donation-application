import About from "./About";
import Banner from "./Banner";
import Card from "./Card";
import ContactUs from "./ContactUs";
import Featured from "./Featured";
import Gallery from "./gallery";
import Member from "./Member";
import Process from "./Process";
import Stats from "./Stats";



const Home = () => {
    return (
       <>
            <Banner></Banner>
            <About></About>
            <Process></Process>
            <Stats></Stats>
            <Card></Card>
            <Member></Member>
            <Featured></Featured>
            <Gallery></Gallery>
            <ContactUs></ContactUs>
       </>
    );
};

export default Home;
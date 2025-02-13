import Banner from "./Banner";
import Card from "./Card";
import ContactUs from "./ContactUs";
import Featured from "./Featured";
import Process from "./Process";
import Stats from "./Stats";



const Home = () => {
    return (
       <>
            <Banner></Banner>
            <Process></Process>
            <Stats></Stats>
            <Card></Card>
            <Featured></Featured>
            <ContactUs></ContactUs>
       </>
    );
};

export default Home;
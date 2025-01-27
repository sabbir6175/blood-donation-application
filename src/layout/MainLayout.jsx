
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';

const MainLayout = () => {
    return (
      
        <>
         <Navbar></Navbar>
         <Outlet></Outlet>
         <Footer></Footer>
        </>
       
    );
};

export default MainLayout;
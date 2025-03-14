import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="">
        <Navbar></Navbar>
        <div className="min-h-screen ">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default MainLayout;

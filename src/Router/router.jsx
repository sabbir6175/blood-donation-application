import {
  createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/Authentication/Login/SignIn";
import SignUp from "../pages/Authentication/Register/SignUp";
import SearchPage from "../Components/SearchPage/SearchPage";
import HomePage from "../pages/Dashboard/HomePage/HomePage";
import Dashboard from "../layout/Dashboard";
import MyDonationRequest from "../pages/Dashboard/MyDonationRequest/MyDonationRequest";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import PrivateRoute from "./PrivetRouter";
import DonationRequest from "../pages/DonationRequest/DonationRequest";
import AllUser from "../pages/Dashboard/Adminpanel/AllUser";
import AllDonationRequest from "../pages/Dashboard/Adminpanel/AllDonationRequest";
import ContentManagement from "../pages/Dashboard/Adminpanel/ContentManagement ";
import AdminHome from "../pages/Dashboard/Adminpanel/AdminHome";
import AddBlog from "../pages/Dashboard/Adminpanel/AddBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/donationRequest',
        element: <DonationRequest></DonationRequest>
      },
      {
        path: '/Search',
        element: <SearchPage></SearchPage>
      },
      {
        path: "SignIn",
        element: <SignIn></SignIn>
      },
      {
        path: "SignUp",
        element: <SignUp></SignUp>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: '/dashboard/home',
        element: <HomePage></HomePage>
      },
      {
        path: '/dashboard/donation/request',
        element: <MyDonationRequest></MyDonationRequest>
      },
      {
        path: '/dashboard/create-donation-request',
        element: <CreateDonationRequest></CreateDonationRequest>
      },
      // Admin Panel
      {
        path: '/dashboard/admin-home',
        element: <AdminHome></AdminHome>
      },
      {
        path: '/dashboard/add-blog',
        element: <AddBlog></AddBlog>
      },
      {
        path: '/dashboard/all-user',
        element: <AllUser></AllUser>
      },
      {
        path: '/dashboard/all-donation-request',
        element: <AllDonationRequest></AllDonationRequest>
      },
      {
        path: '/dashboard/content-management',
        element: <ContentManagement></ContentManagement>
      },
    ]
  }
]);

export default router;

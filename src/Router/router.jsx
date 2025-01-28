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
  
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
          path: '/',
          element: <Home></Home>
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
      path : 'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
      ]

    }
    

  ]);
  export default router
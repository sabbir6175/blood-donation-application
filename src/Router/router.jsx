import {
    createBrowserRouter
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/Authentication/Login/SignIn";
import SignUp from "../pages/Authentication/Register/SignUp";
import SearchPage from "../Components/SearchPage/SearchPage";
  
  
  
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
    

  ]);
  export default router
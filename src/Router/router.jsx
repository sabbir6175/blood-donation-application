import {
  createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/Authentication/Login/SignIn";
import SignUp from "../pages/Authentication/Register/SignUp";
import SearchPage from "../Components/SearchPage/SearchPage";
import Dashboard from "../layout/Dashboard";
import MyDonationRequest from "../pages/Dashboard/MyDonationRequest/MyDonationRequest";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import PrivateRoute from "./PrivetRouter";
import DonationRequest from "../pages/DonationRequest/DonationRequest";
import AllUser from "../pages/Dashboard/AdminPanel/AllUser";
import AllDonationRequest from "../pages/Dashboard/AdminPanel/AllDonationRequest";
import ContentManagement from "../pages/Dashboard/AdminPanel/ContentManagement ";
import AdminHome from "../pages/Dashboard/AdminPanel/AdminHome";
import AddBlog from "../pages/Dashboard/AdminPanel/AddBlog";
import AdminProfile from "../pages/Dashboard/AdminPanel/AdminProfile";
import DonationDetails from "../pages/DonationRequest/DonationDetails";
import DashboardHome from "../pages/Dashboard/HomePage/DashboardHome";
import UpdateEdit from "../pages/Dashboard/HomePage/UpdateEdit";
import Blogs from "../pages/Blogs/Blogs";
import BlogDetailPage from "../pages/Blogs/BlogDetailPage";
import RequestBlood from "../pages/Dashboard/Volunteer/RequestBlood";
import ContentManagementVolunteer from "../pages/Dashboard/Volunteer/ContentManagementVolunteer";
import Funding from "../pages/Funding/Funding";
import VolunteerHome from "../pages/Dashboard/Volunteer/VolunteerHome";
import FAQ from "../pages/FAQ/FAQ";

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
        path: '/donationDetails/:id',
        element: <PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>
      },
      {
        path: '/faq',
        element: <FAQ></FAQ>
      },
      {
        path: '/blogs/:id',
        element: <BlogDetailPage></BlogDetailPage>
      },
      {
        path: '/funding-page',
        element:<Funding></Funding>
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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: '/dashboard/profile',
        element: <AdminProfile></AdminProfile>
      },
      // Admin Panel
      {
        path: '/dashboard/admin',
        element: <AdminHome></AdminHome>
      },
      {
        path: '/dashboard/content-management/add-blog',
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
      //donor dashboard
      {
        path: '/dashboard/donor',
        element: <DashboardHome></DashboardHome>
      },
      {
        path: '/dashboard/Update/:id',
        element: <UpdateEdit></UpdateEdit>,
        loader: ({params}) => fetch(`https://blood-donation-server-side-project.vercel.app/donationRequest/${params.id}`)
      },
      {
        path: '/dashboard/my-donation-requests',
        element: <MyDonationRequest></MyDonationRequest>
      },
      {
        path: '/dashboard/create-donation-request',
        element: <CreateDonationRequest></CreateDonationRequest>
      },
      //volunteer dashboard
      {
        path: '/dashboard/Volunteer',
        element: <VolunteerHome></VolunteerHome>
      },
      {
        path: '/dashboard/all-blood-donation-request',
        element: <RequestBlood></RequestBlood>
      },
      {
        path: '/dashboard/content-management-volunteer',
        element: <ContentManagementVolunteer></ContentManagementVolunteer>
      }
    ]
  }
]);

export default router;

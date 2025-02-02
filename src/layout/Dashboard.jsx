import {  FaDonate, FaEdit, FaHome, FaMapMarked, FaUser, FaUsers } from "react-icons/fa";

import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {

        const [isAdmin] = useAdmin();
    return (
        <div className="flex ">
            {/* dashboard side bar */}
            <div className="  md:w-64 md:min-h-screen  bg-orange-500">
                <ul className="menu p-4  min-h-screen fixed top-0 z-50 rounded-sm m-2">
                   {
                    isAdmin ? (<>
                        <li >
                            <Link to="/dashboard/admin-profile" >
                                
                                <FaUser></FaUser>
                                Profile</Link>
                        </li>
                        <li >
                            <Link to="/dashboard" >
                                
                                <FaHome></FaHome>
                                Admin Home</Link>
                        </li>
                       
                        <li >
                            <Link to="/dashboard/All-donation-request">
                                <FaDonate></FaDonate>
                                All Blood Donation Request</Link>
                        </li>
                        <li >
                            <Link to="/dashboard/content-management">
                                <FaEdit></FaEdit>
                                Content Management Page </Link>
                        </li>
                        <li >
                            <Link to="/dashboard/all-user">
                                <FaUsers></FaUsers>
                                All Users</Link>
                        </li>
                        <li >
                        <Link to="/dashboard/add-blog">
                            <FaHome></FaHome>
                            Add blog</Link>
                        </li>
                    </>): (<>
                        <li >
                            <Link to="/dashboard/admin-profile" >
                                
                                <FaUser></FaUser>
                                Profile</Link>
                        </li>
                    <li >
                        <Link to="/dashboard">
                            <FaHome></FaHome>
                            User Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/donation/request">
                            <FaDonate></FaDonate>
                            My Donation Request</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/create-donation-request">
                            <FaMapMarked></FaMapMarked>
                            Create Donation Request</Link>
                    </li>
                    </>)
                   }
                    <div className="divider"></div>
                    <li>
                        <Link to="/">
                            <FaHome></FaHome>
                            Home</Link>
                    </li>
                    
                </ul>
            </div>
            {/* dashboard content */}
            
            <div className="flex-1 ">

                <div className="bg-red-500 w-full py-4 text-3xl sticky top-0 z-50 font-bold text-white text-center"> Dashboard</div>
                <div className="p-8 ">
                <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
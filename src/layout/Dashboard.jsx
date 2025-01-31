import {  FaDonate, FaEdit, FaHome, FaMapMarked, FaUsers } from "react-icons/fa";

import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {

        const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-500">
                <ul className="menu p-4  min-h-screen rounded-sm m-2">
                   {
                    isAdmin ? (<>
                        <li >
                            <NavLink to="/dashboard/Admin-home">
                                <FaHome></FaHome>
                                Admin Home</NavLink>
                        </li>
                       
                        <li >
                            <NavLink to="/dashboard/All-donation-request">
                                <FaDonate></FaDonate>
                                All Blood Donation Request</NavLink>
                        </li>
                        <li >
                            <NavLink to="/dashboard/content-management">
                                <FaEdit></FaEdit>
                                Content Management Page </NavLink>
                        </li>
                        <li >
                            <NavLink to="/dashboard/all-user">
                                <FaUsers></FaUsers>
                                All Users</NavLink>
                        </li>
                    </>): (<>
                    
                    <li >
                        <NavLink to="/dashboard/home">
                            <FaHome></FaHome>
                            User Home</NavLink>
                    </li>
                    <li >
                        <NavLink to="/dashboard/add-blog">
                            <FaHome></FaHome>
                            Add blog</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/donation/request">
                            <FaDonate></FaDonate>
                            My Donation Request</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/create-donation-request">
                            <FaMapMarked></FaMapMarked>
                            Create Donation Request</NavLink>
                    </li>
                    </>)
                   }
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 ">
                <div className="bg-red-500 w-full py-4 text-3xl font-bold text-white text-center  ">Dashboard</div>
                <div className="p-8 ">
                <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
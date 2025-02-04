import {  FaDonate, FaEdit, FaHome, FaMapMarked, FaUser, FaUsers } from "react-icons/fa";

import { Link, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useDonor from "../Hooks/useDonor";
// import useVolunteer from "../Hooks/useVolunteer";


const Dashboard = () => {

        const [isAdmin] = useAdmin();
        const [isDonor] = useDonor();
        // const [isVolunteer] = useVolunteer();
    return (
        <div className="flex ">
            {/* dashboard side bar */}
            <div className="  md:w-64 md:min-h-screen  bg-gradient-to-r from-red-600 to-green-500 ">
                <ul className="menu p-4  min-h-screen fixed top-0 z-50 rounded-sm m-2">
                    <li >
                            <Link to="/dashboard/admin-profile" >
                                
                                <FaUser></FaUser>
                                Profile</Link>
                    </li>
                   {
                    isAdmin && (<>
                        
                        <li >
                            <Link to="/dashboard/Home" >
                                
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
                        
                    </>)
                    }
                    {/* {
                        isVolunteer &&(
                            <>
                            
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
                        
                            
                            
                            </>
                        )
                    } */}
                    {
                    isDonor ? null: (<>
                                        
                        <li >
                            <Link to="/dashboard/user">
                                <FaHome></FaHome>
                                User Home</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-donation-requests">
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

                <div className="bg-gradient-to-r from-red-600 to-green-500  w-full py-4 text-3xl sticky top-0 z-50 font-bold text-white text-center"> Dashboard</div>
                <div className="p-8 ">
                <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
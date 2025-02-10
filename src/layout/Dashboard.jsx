import {
  FaDonate,
  FaEdit,
  FaHome,
  FaMapMarked,
  FaUser,
  FaUsers,
} from "react-icons/fa";

import { Link, Outlet,} from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  console.log(isAdmin);


  return (
    <div className="flex">
      <div className="hidden text-white md:block md:w-64 md:min-h-screen bg-gradient-to-r from-red-600 to-green-500">
        <ul className="menu  min-h-screen fixed top-0 z-50 rounded-sm m-2">
          {isAdmin?.admin === true && (
            <>
            <h1 className="text-2xl font-semibold text-center text-white mb-10">Admin <br /> Dashboard</h1>
             <li>
                <Link to="/dashboard/admin-profile">
                  <FaUser />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/admin">
                  <FaHome />
                  Admin Home
                </Link>
              </li>

              <li>
                <Link to="/dashboard/All-donation-request">
                  <FaDonate />
                  All Blood Donation Request
                </Link>
              </li>
              <li>
                <Link to="/dashboard/content-management">
                  <FaEdit />
                  Content Management Page{" "}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/all-user">
                  <FaUsers />
                  All Users
                </Link>
              </li>
            </>
          )}

          {isAdmin?.volunteer === true && (
            <>
            <h1 className="text-2xl font-semibold text-center text-white mb-10">Volunteer <br /> Dashboard</h1>
             <li>
                <Link to="/dashboard/admin-profile">
                  <FaUser />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/admin">
                  <FaHome />
                  Admin Home
                </Link>
              </li>
              
              <li>
                <Link to="/dashboard/all-blood-donation-request">
                  <FaDonate />
                  All Blood Donation Request
                </Link>
              </li>
              <li>
                <Link to="">
                  <FaEdit />
                  Content Management Page{" "}
                </Link>
              </li>
            </>
          )}
          {isAdmin?.donor === true && (
            <>
            <h1 className="text-2xl font-semibold text-center text-white mb-10">Donar <br /> Dashboard</h1>
              <li>
                <Link to="/dashboard/admin-profile">
                  <FaUser />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/donor">
                  <FaHome />
                  User Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-donation-requests">
                  <FaDonate />
                  My Donation Request
                </Link>
              </li>
              <li>
                <Link to="/dashboard/create-donation-request">
                  <FaMapMarked />
                  Create Donation Request
                </Link>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <Link to="/">
              <FaHome />
              Home
            </Link>
          </li>
        </ul>
      </div>

      {/* <div className="hidden md:block md:w-64 md:min-h-screen bg-gradient-to-r from-red-600 to-green-500">
        <ul className="menu p-4 min-h-screen fixed top-0 z-50 rounded-sm m-2">
          <li>
            <Link to="/dashboard/admin-profile">
              <FaUser />
              Profile
            </Link>
          </li>

          {isAdmin ? (
            <>
              <li>
                <Link to="/dashboard">
                  <FaHome />
                  Admin Home
                </Link>
              </li>

              <li>
                <Link to="/dashboard/All-donation-request">
                  <FaDonate />
                  All Blood Donation Request
                </Link>
              </li>
              <li>
                <Link to="/dashboard/content-management">
                  <FaEdit />
                  Content Management Page{" "}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/all-user">
                  <FaUsers />
                  All Users
                </Link>
              </li>
            </>
          ) : isDonor ? (
            <>
              <li>
                <Link to="/dashboard">
                  <FaHome />
                  User Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-donation-requests">
                  <FaDonate />
                  My Donation Request
                </Link>
              </li>
              <li>
                <Link to="/dashboard/create-donation-request">
                  <FaMapMarked />
                  Create Donation Request
                </Link>
              </li>
            </>
          ) : isVolunteer ? (
            <>
              <li>
                <Link to="">
                  <FaHome />
                  User Home
                </Link>
              </li>
              <li>
                <Link to="">
                  <FaDonate />
                  All Blood Donation Request
                </Link>
              </li>
              <li>
                <Link to="">
                  <FaEdit />
                  Content Management Page{" "}
                </Link>
              </li>
            </>
          ) : null}

          <div className="divider"></div>
          <li>
            <Link to="/">
              <FaHome />
              Home
            </Link>
          </li>
        </ul>
      </div> */}
      {/* dashboard content */}

      <div className="flex-1">
        <div className="bg-gradient-to-r from-red-600 to-green-500 w-full py-4 text-3xl sticky top-0 z-50 font-bold text-white text-center">
          Dashboard
        </div>
        <div className="p-0 md:p-4 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

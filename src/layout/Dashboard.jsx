import {
  FaDonate,
  FaEdit,
  FaHome,
  FaMapMarked,
  FaUser,
  FaUsers,
} from "react-icons/fa";

import { Link, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { MdOutlineMenu } from "react-icons/md";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  console.log(isAdmin);

  const linkAdmin = (
    <>
      <li>
        <Link to="/dashboard/profile">
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
      <div className="divider"></div>
      <li>
        <Link to="/">
          <FaHome />
          Home
        </Link>
      </li>
    </>
  );
  const linkVolunteer = (
    <>
      <li>
        <Link to="/dashboard/profile">
          <FaUser />
          Profile
        </Link>
      </li>
      <li>
        <Link to="/dashboard/Volunteer">
          <FaHome />
          Volunteer Home
        </Link>
      </li>
      <li>
        <Link to="/dashboard/all-blood-donation-request">
          <FaDonate />
          All Blood Donation Request
        </Link>
      </li>
      <li>
        <Link to="/dashboard/content-management-volunteer">
          <FaEdit />
          Content Management Page
        </Link>
      </li>

      <div className="divider"></div>
      <li>
        <Link to="/">
          <FaHome />
          Home
        </Link>
      </li>
    </>
  );
  const linkDonor = (
    <>
      <li>
        <Link to="/dashboard/profile">
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

      <div className="divider"></div>
          <li>
            <Link to="/">
              <FaHome />
              Home
            </Link>
      </li>
    </>
  );

  return (
    <div className="flex">
      <div className=" flex flex-row md:flex-col text-black  md:w-64 md:min-h-screen bg-gradient-to-t from-green-300 to-green-100">
        <ul className="menu w-full md:w-64  bg-gradient-to-r from-red-200 to-green-100  md:min-h-screen fixed top-0 z-50 rounded-sm ">
          {isAdmin?.admin === true && (
            <>
              <div className="flex justify-between place-items-center w-full sticky top-0 z-50 ">
                <div className="w-1/2 text-xl font-semibold text-center text-black md:mb-10">
                  <h1 className="">Admin Dashboard</h1>
                </div>
                <div className="drawer w-1/2 text-end mr-5 block md:hidden ">
                  <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn  drawer-button">
                      <MdOutlineMenu></MdOutlineMenu>
                    </label>
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-black bg-gradient-to-r from-red-200 to-green-100   min-h-full  p-4">
                      {/* Sidebar content here */}
                      {linkAdmin}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">{linkAdmin}</div>
            </>
          )}

          {isAdmin?.volunteer === true && (
            <>
              <div className="flex justify-between place-items-center w-full sticky top-0 z-50 ">
                <div className="w-1/2 text-xl font-semibold text-center text-black md:mb-10">
                  <h1 className="">Volunteer Dashboard</h1>
                </div>
                <div className="drawer w-1/2 text-end mr-5 block md:hidden ">
                  <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn  drawer-button">
                      <MdOutlineMenu></MdOutlineMenu>
                    </label>
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-black bg-gradient-to-r from-red-200 to-green-100   min-h-full  p-4">
                      {/* Sidebar content here */}
                      {linkVolunteer}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">{linkVolunteer}</div>
            </>
          )}
          {isAdmin?.donor === true && (
            <>
              <div className="flex justify-between place-items-center w-full sticky top-0 z-50 ">
                <div className="w-1/2 text-xl font-semibold text-center text-black md:mb-10">
                  <h1 className="">Donor Dashboard</h1>
                </div>
                <div className="drawer w-1/2 text-end mr-5 block md:hidden ">
                  <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn  drawer-button">
                      <MdOutlineMenu></MdOutlineMenu>
                    </label>
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-black bg-gradient-to-r from-red-200 to-green-100   min-h-full  p-4">
                      {/* Sidebar content here */}
                      {linkDonor}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">{linkDonor}</div>
            </>
          )}
        </ul>
      </div>

      <div className="flex-1 md:flex-0 w-full md:w-0">
        <div className="hidden bg-gradient-to-r from-green-300 to-green-100 w-full py-4 text-3xl sticky top-0 z-50 font-bold text-white text-center">
          Dashboard
        </div>
        <div className="container mx-auto p-0 md:p-4 mt-20 md:mt-0 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

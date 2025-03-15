import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../AuthContext/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { RiDashboardFill } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";
// import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const { user, singOutUser } = useContext(AuthContext); // Use context to get user state
  // const [isAdmin] = useAdmin();
  // console.log(" user  ", isAdmin);
  // Define links to show on the navbar
  const links = (
    <>
      <li className="hover:text-green-300">
        <Link to="/">Home</Link>
      </li>
      <li className="hover:text-green-300">
        <Link to="/Search">Search</Link>
      </li>
      <li className="hover:text-green-300">
        <Link to="/donationRequest">Donation Requests</Link>
      </li>
      <li className="hover:text-green-300">
        <Link to="/blogs">Blog</Link>
      </li>
      {user && (
        <>
          <li className="hover:text-green-300">
            <Link to="/funding-page">Funding Links</Link>
          </li>
        </>
      )}
    </>
  );

  const handleSingOut = () => {
    singOutUser()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "user logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        toast.error("Failed to sign out", error);
      });
  };

  return (
    <div className="bg-gradient-to-r from-green-300 to-green-100  text-black fixed w-full  top-0  bg-opacity-80 backdrop-blur-md z-20">
       <div className="navbar   md:px-10 text-black ">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost  lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content -ml-5  bg-gradient-to-r from-green-400 to-green-50 text-black rounded-sm  z-[1] mt-2 w-52 p-2 shadow-2xl"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="https://i.ibb.co.com/vCVdBSj0/logo.webp"
            className=""
            alt="Logo"
          />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1  ">{links}</ul>
      </div>
      <div className="navbar-end">
        <h1 className="mr-2">{user?.displayName}</h1>
        {user ? (
          <li className="list-none">
            <div className="dropdown">
              <button tabIndex={0} className=" mr-5">
                <img
                  src={user?.photoURL}
                  className="w-10 h-10  rounded-full"
                  alt="User photoURL"
                />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content -ml-28 bg-gradient-to-r from-green-300 to-green-100 text-black menu menu-compact  rounded-box w-44 shadow-lg mt-2"
              >
                {/* {isAdmin?.admin ? (
                  <li>
                    <Link to="/dashboard/admin">
                      <RiDashboardFill></RiDashboardFill> Dashboard
                    </Link>
                  </li>
                ) : isAdmin?.volunteer ? (
                  <li>
                    <Link to="/dashboard/admin">
                      {" "}
                      <RiDashboardFill></RiDashboardFill> Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/dashboard/donor">
                      {" "}
                      <RiDashboardFill></RiDashboardFill> Dashboard
                    </Link>
                  </li>
                )} */}
                <li>
                  <Link to="/dashboard">
                    {" "}
                    <RiDashboardFill></RiDashboardFill> Dashboard
                  </Link>
                </li>

                <li>
                  <button onClick={handleSingOut}>
                    <CgLogOut className="-rotate-180"></CgLogOut> Logout
                  </button>
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <Link
            to="/SignIn"
            className="btn btn-sm lg:btn-md text-black bg-gradient-to-r from-green-300 bg-green-200 outline-none "
          >
            SignIn
          </Link>
        )}
      </div>
    </div>
    </div>
 
  );
};

export default Navbar;

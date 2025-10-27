import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import {
  FaHandHoldingUsd,
  FaHeartbeat,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import AuthContext from "../../../AuthContext/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const VolunteerHome = () => {
  const { user } = useContext(AuthContext);
  const [donationRequest, setDonationRequests] = useState([]);
  const [funding, setFunding] = useState(0);

  const AxiosPublic = useAxiosPublic();
  const AxiosSecure = useAxiosSecure();

  // Fetch Donation Requests
  useEffect(() => {
    AxiosPublic.get("/donationRequest/data")
      .then((res) => setDonationRequests(res.data))
      .catch((error) => console.error("Error fetching donation data:", error));
  }, [AxiosPublic]);

  // Fetch Total Funding
  useQuery({
    queryKey: ["fund"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/funds");
      const totalFunding = res.data.funds.reduce(
        (total, fund) => total + parseFloat(fund.fundAmount || 0),
        0
      );
      setFunding(totalFunding);
      return res.data;
    },
  });

  // Fetch Users
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await AxiosSecure.get("/volunteer/user");
      return response.data.users;
    },
  });

  const donors = userData ? userData.filter((u) => u.role === "donor") : [];
  const volunteer = userData
    ? userData.filter((u) => u.role === "volunteer")
    : [];

  if (userLoading)
    return <div className="mt-20 text-lg text-center">Loading...</div>;
  if (userError) return <div>Error fetching users: {userError.message}</div>;

  // Stats Cards Data
  const stats = [
    {
      title: "Total Donors",
      value: donors.length,
      icon: <FaUsers className="text-3xl text-pink-500" />,
      gradient: "from-pink-100 to-green-100",
    },
    {
      title: "Total Volunteers",
      value: volunteer.length,
      icon: <FaUserFriends className="text-3xl text-green-500" />,
      gradient: "from-green-100 to-pink-100",
    },
    {
      title: "Blood Requests",
      value: donationRequest.length,
      icon: <FaHeartbeat className="text-3xl text-red-500" />,
      gradient: "from-rose-100 to-green-100",
    },
    {
      title: "Total Funding",
      value: `$${funding}`,
      icon: <FaHandHoldingUsd className="text-3xl text-emerald-500" />,
      gradient: "from-green-100 to-pink-100",
    },
  ];

  return (
    <div className="p-5 md:p-8 min-h-screen bg-gradient-to-br from-[#C6F6D5] via-white to-[#FDE2E4]">
      {/* Welcome Section */}
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-extrabold text-gray-800 md:text-3xl">
          Welcome, <span className="">{user?.displayName || "Volunteer"}</span>{" "}
          👋
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Here’s your volunteer dashboard overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-r ${item.gradient} shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center border border-white/60 backdrop-blur-lg`}
          >
            <div className="mb-2">{item.icon}</div>
            <h3 className="text-sm font-semibold text-center text-gray-700 md:text-base">
              {item.title}
            </h3>
            <p className="mt-1 text-xl font-extrabold text-gray-900 md:text-2xl">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Static Section (Customizable Later) */}
      <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
        {/* Left: Recent Activities */}
        <div className="p-5 border shadow-lg bg-white/70 rounded-2xl border-white/50">
          <h2 className="mb-3 text-lg font-bold text-gray-800">
            Recent Activities
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Donor registration approved</li>
            <li>💉 3 blood donations completed this week</li>
            <li>💰 New funding received: $500</li>
            <li>🩸 Urgent O+ blood request in Rangpur</li>
          </ul>
        </div>

        {/* Right: Quick Actions */}
        <div className="p-5 border shadow-lg bg-white/70 rounded-2xl border-white/50">
          <h2 className="mb-3 text-lg font-bold text-gray-800">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 text-sm text-white transition bg-green-500 rounded-lg hover:bg-green-600">
              Add Blood Request
            </button>
            <button className="px-4 py-2 text-sm text-white transition bg-pink-500 rounded-lg hover:bg-pink-600">
              Manage Donors
            </button>
            <button className="px-4 py-2 text-sm text-white transition bg-yellow-500 rounded-lg hover:bg-yellow-600">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHome;

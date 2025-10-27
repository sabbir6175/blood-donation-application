import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { FaHandHoldingUsd, FaHeartbeat, FaUsers } from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AuthContext from "../../../AuthContext/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const [donationRequest, setDonationRequests] = useState([]);
  const [funding, setFunding] = useState([]);

  const AxiosPublic = useAxiosPublic();
  const AxiosSecure = useAxiosSecure();

  const totalFunding = funding.reduce(
    (total, fund) => total + parseFloat(fund.fundAmount || 0),
    0
  );

  useEffect(() => {
    AxiosPublic.get("/donationRequest/data")
      .then((res) => setDonationRequests(res.data))
      .catch((err) => console.error("Error fetching donation data:", err));
  }, [AxiosPublic]);

  const { isLoading: fundLoading } = useQuery({
    queryKey: ["fund"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/funds");
      setFunding(res.data.funds);
      return res.data;
    },
  });

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/admin/users");
      return res.data.users;
    },
  });

  if (userLoading || fundLoading)
    return <div className="mt-10 text-center text-gray-700">Loading...</div>;
  if (userError) return <div>Error: {userError.message}</div>;

  const donors = userData?.filter((u) => u.role === "donor") || [];
  const volunteers = userData?.filter((u) => u.role === "volunteer") || [];

  const chartData = [
    { name: "Donors", value: donors.length },
    { name: "Volunteers", value: volunteers.length },
    { name: "Requests", value: donationRequest.length },
    { name: "Funding", value: totalFunding },
  ];

  return (
    <div className="min-h-screen p-6  md:p-10 bg-gradient-to-br from-[#E8F5E9] via-[#FFF8F9] to-[#F1F8E9]">
      {/* Welcome */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-extrabold text-gray-800 md:text-4xl">
          Welcome,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-pink-500">
            {user?.displayName}
          </span>{" "}
          👋
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Your Admin Dashboard Overview
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Donors",
            value: donors.length,
            icon: <FaUsers className="text-5xl text-green-500" />,
            gradient: "from-green-200 to-green-100",
          },
          {
            title: "Volunteers",
            value: volunteers.length,
            icon: <FaUsers className="text-5xl text-pink-400" />,
            gradient: "from-pink-100 to-pink-50",
          },
          {
            title: "Blood Requests",
            value: donationRequest.length,
            icon: <FaHeartbeat className="text-5xl text-red-400" />,
            gradient: "from-red-100 to-rose-50",
          },
          {
            title: "Total Funding",
            value: `$${totalFunding.toFixed(2)}`,
            icon: <FaHandHoldingUsd className="text-5xl text-emerald-500" />,
            gradient: "from-emerald-100 to-green-50",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className={`p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all bg-gradient-to-br ${card.gradient}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-600">{card.title}</h3>
                <p className="text-3xl font-extrabold text-gray-800">
                  {card.value}
                </p>
              </div>
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Bar Chart */}
        <motion.div
          className="p-6 bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="mb-4 text-lg font-bold text-gray-700">
            📊 Overall Statistics
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="value"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
                barSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          className="p-6 bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-4 text-lg font-bold text-gray-700">
            💹 Funding Growth Trend
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={funding}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="donorName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="fundAmount"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 9, fill: "#4ade80" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;

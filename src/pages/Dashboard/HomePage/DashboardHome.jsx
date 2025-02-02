import {  useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect } from "react";

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const axiosSecure = useAxiosSecure()

  

   useEffect(() => {
     axiosSecure
       .get("/donationRequest")
       .then((res) => {
        // console.log(res.data)
         setDonations(res.data);
       });
   }, [axiosSecure]);
   const formatDate = (donationDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const dated = new Date(donationDate);
    return dated.toLocaleDateString("en-US", options);
  };

console.log(donations)
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, Donor!</h1>
      
      {/* Display 3 most recent donations */}
      {donations.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="">
            <tr className="">
              <th className="text-center text-black text-sm font-semibold py-2 ">Recipient Name</th>
              <th className="text-center text-black text-sm font-semibold py-2 ">Location</th>
              <th className="text-center text-black text-sm font-semibold py-2 ">Date</th>
              <th className="text-center text-black text-sm font-semibold py-2 ">Blood Group</th>
              <th className="text-center text-black text-sm font-semibold py-2 ">Status</th>
              <th className="text-center text-black text-sm font-semibold py-2 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.slice(0, 3).map((donation) => (
              <tr key={donation._id} className="text-center">
                <td className="py-2   text-sm text-gray-900">{donation.recipientName}</td>
                <td className="py-2   text-sm text-gray-900">{donation.recipientDistrict}, {donation.recipientUpazila}</td>
                <td className="py-2   text-sm text-gray-900">{formatDate(donation?.donationDate)}</td>
                <td className="py-2   text-sm text-gray-900">{donation.bloodGroup}</td>
                <td className="py-2   text-sm text-gray-900">{donation.donationStatus}</td>
                <td className="py-2   text-sm text-gray-900">
                  {donation.donationStatus === "inprogress" && (
                    <>
                      <button className="bg-green-500 text-white py-1 px-3 rounded mr-2">Done</button>
                      <button className="bg-red-500 text-white py-1 px-3 rounded">Cancel</button>
                    </>
                  )}
                  <button className="bg-blue-500 text-white py-1 px-3 rounded ml-2">Edit</button>
                  <button className="bg-yellow-500 text-white py-1 px-3 rounded ml-2">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No donation requests found.</p>
      )}

      <Link to="/my-donation-requests">
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded">View My All Requests</button>
      </Link>
    </div>
  );
};

export default Dashboard;

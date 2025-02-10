import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AllDonationRequest = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const AxiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    // Fetch all donation requests for admin
    AxiosPublic.get("/donationRequest")
      .then((res) => {
        setDonationRequests(res.data); // Set all donations
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching donation requests");
        setLoading(false);
      });
  }, [AxiosPublic]);

  // Function to update donation status (approve/reject)
  const handleStatusChange = (id, status) => {
    axiosSecure.put(`/donationRequest/${id}`, { donationStatus: status })
      .then((res) => {
        console.log(res.data)
        setDonationRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id ? { ...request, donationStatus: status } : request
          )
        );
        toast.success(`Successfully updated donation ${status}`,{
          top:'center'
        })
      })
      .catch((err) => {
        console.error("Error details:", err); // Log the full error object for debugging
        setError("Error updating donation status"); // Display a generic error message
      });
  };
  

  // Format date to a readable format
  const formatDate = (donationDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const dated = new Date(donationDate);
    return dated.toLocaleDateString("en-US", options);
  };

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl text-center mt-2 md:text-3xl font-bold mb-4">
        All Blood Donation Requests ({donationRequests.length})
      </h1>

      <div className="overflow-x-auto p-4">
        <table className="md:min-w-full overflow-x-auto table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="py-2 font-semibold text-gray-700 border-b">No</th>
              <th className="py-2 font-semibold text-gray-700 border-b">Recipient Name</th>
              <th className="py-2 font-semibold text-gray-700 border-b">Location</th>
              <th className="py-2 font-semibold text-gray-700 border-b">Date</th>
              <th className="py-2 font-semibold text-gray-700 border-b">Group</th>
              <th className="py-2 font-semibold text-gray-700 border-b">Status</th>
              <th className="py-2 font-semibold text-gray-700 border-b">Action</th>
            </tr>
          </thead>

          <tbody>
            {donationRequests.length > 0 ? (
              donationRequests.map((request, index) => (
                <tr key={request._id} className="border-b text-center hover:bg-slate-50">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{request.recipientName}</td>
                  <td className="py-2">
                    {request.recipientDistrict}, {request.recipientUpazila}
                  </td>
                  <td className="py-2">{formatDate(request.donationDate)}</td>
                  <td className="py-2">{request.bloodGroup}</td>
                  <td className="py-2">{request.donationStatus}</td>
                  <td className="py-2 flex flex-col  md:flex-row text-center">
                    {/* Buttons to change donation status */}
                    {request.donationStatus !== "done" && (
                      <button
                        onClick={() => handleStatusChange(request._id, "done")}
                        className="bg-green-500 btn-sm text-white rounded mr-2"
                      >
                        Approve
                      </button>
                    )}
                    {request.donationStatus !== "canceled" && (
                      <button
                        onClick={() => handleStatusChange(request._id, "canceled")}
                        className="bg-red-500 btn-sm text-white rounded"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No donation requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDonationRequest;




// import { useState, useEffect } from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const AllDonationRequest = () => {
//   const [donationRequests, setDonationRequests] = useState([]);
//   const [statusFilter, setStatusFilter] = useState(""); // For filtering by status
//   const [currentPage, setCurrentPage] = useState(1); // Pagination: current page
//   const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
//   const [loading, setLoading] = useState(false); // Loading state
//   const axiosSecure = useAxiosSecure();

//   // Fetch donation requests for the logged-in user
//   const fetchDonationRequests = async () => {
//     setLoading(true); // Start loading
//     try {
//       const response = await axiosSecure.get("/donationRequest", {
//         params: {
//           donationStatus: statusFilter, // Status filter
//           page: currentPage, // Current page
//           limit: 10, // Items per page
//         },
//       });

//       setDonationRequests(response.data.donationRequests); // Assuming `donationRequests` is returned in the response
//       setTotalPages(response.data.totalPages); // Assuming `totalPages` is returned
//     } catch (error) {
//       console.error("Error fetching donation requests:", error);
//       setLoading(false); // Stop loading if error occurs
//     }
//   };

//   // Call the fetch function when the component mounts or when filters/pagination change
//   useEffect(() => {
//     fetchDonationRequests();
//   }, [statusFilter, currentPage]);

//   // Update donation status
//   const updateDonationStatus = async (id, status) => {
//     try {
//       const response = await axiosSecure.put(`/donationRequest/${id}`, { donationStatus: status });
//       console.log(response.data.message);  // Success message

//       // Optionally, trigger a re-fetch of donation requests to update the UI
//       fetchDonationRequests();
//     } catch (error) {
//       console.error("Error updating status:", error.response ? error.response.data.message : error.message);
//     }
//   };

//   // Mark as Done button click handler
//   const handleMarkAsDone = (id) => {
//     updateDonationStatus(id, "done");
//   };

//   // Cancel button click handler
//   const handleCancelRequest = (id) => {
//     updateDonationStatus(id, "canceled");
//   };

//   // Format donation date to a readable format
//   const formatDate = (donationDate) => {
//     const options = { day: "2-digit", month: "short", year: "numeric" };
//     const dated = new Date(donationDate);
//     return dated.toLocaleDateString("en-US", options);
//   };

//   return (
//     <div className="bg-slate-50">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-semibold text-center mb-6">
//           My Donation Requests
//         </h1>

//         {/* Status filter */}
//         <div className="mb-4 flex justify-between items-center">
//           <label htmlFor="statusFilter" className="text-lg font-medium">
//             Status Filter:
//           </label>
//           <select
//             id="statusFilter"
//             onChange={(e) => setStatusFilter(e.target.value)}
//             value={statusFilter}
//             className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">All</option>
//             <option value="pending">Pending</option>
//             <option value="inprogress">In Progress</option>
//             <option value="done">Done</option>
//             <option value="canceled">Canceled</option>
//           </select>
//         </div>

//         {/* Donation Requests Table */}
//         {loading ? (
//           <div className="text-center py-4">Loading...</div>
//         ) : (
//           <table className="min-w-full table-auto border-collapse border border-gray-300">
//             <thead className="">
//               <tr>
//                 <th className="px-6 py-3 text-center">Recipient Name</th>
//                 <th className="px-6 py-3 text-center">Location</th>
//                 <th className="px-6 py-3 text-center">Date</th>
//                 <th className="px-6 py-3 text-center">Group</th>
//                 <th className="px-6 py-3 text-center">Status</th>
//                 <th className="px-6 py-3 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {donationRequests.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-4">
//                     No donation requests available.
//                   </td>
//                 </tr>
//               ) : (
//                 donationRequests.map((request) => (
//                   <tr key={request._id} className="border-t hover:bg-slate-50 text-center">
//                     <td className="px-6 py-4">{request.recipientName}</td>
//                     <td className="py-2 text-sm">{request.recipientDistrict}, {request.recipientUpazila}</td>
//                     <td className="py-2 text-sm">{formatDate(request?.donationDate)}</td>
//                     <td className="px-6 py-4">{request.bloodGroup}</td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-2 py-1 text-sm rounded-full ${
//                           request.donationStatus === "pending"
//                             ? "bg-yellow-200 text-yellow-800"
//                             : request.donationStatus === "inprogress"
//                             ? "bg-blue-200 text-blue-800"
//                             : request.donationStatus === "done"
//                             ? "bg-green-200 text-green-800"
//                             : "bg-red-200 text-red-800"
//                         }`}
//                       >
//                         {request.donationStatus}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 space-x-2">
//                       {request.donationStatus !== "done" && (
//                         <button
//                           onClick={() => handleMarkAsDone(request._id)}
//                           className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
//                         >
//                           Approve
//                         </button>
//                       )}
//                       {request.donationStatus !== "canceled" && (
//                         <button
//                           onClick={() => handleCancelRequest(request._id)}
//                           className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//                         >
//                           Reject
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         )}

//         {/* Pagination Controls */}
//         <div className="mt-6 flex justify-between items-center">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//             className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:bg-gray-400"
//           >
//             Previous Page
//           </button>
//           <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//             className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:bg-gray-400"
//           >
//             Next Page
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllDonationRequest;




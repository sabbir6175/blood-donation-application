import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyDonationRequest = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // For filtering by status
  const [currentPage, setCurrentPage] = useState(1); // Pagination: current page
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
  const [loading, setLoading] = useState(false); // Loading state
  const axiosSecure = useAxiosSecure();

  // Fetch donation requests for the logged-in user
  const fetchDonationRequests = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axiosSecure.get("/my-donation-requests", {
        params: {
          donationStatus: statusFilter, // Status filter
          page: currentPage, // Current page
          limit: 10, // Items per page
        },
      });

      setDonationRequests(response.data.donationRequests);
      setTotalPages(response.data.totalPages); // Update the total pages
    } catch (error) {
      console.error("Error fetching donation requests:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Call the fetch function when the component mounts or when filters/pagination change
  useEffect(() => {
    fetchDonationRequests();
  }, [statusFilter, currentPage]);

  const handleStatusChange = (id, status) => {
    axiosSecure
      .patch(`/donationRequestStatus/${id}`, { donationStatus: status })
      .then((res) => {
        console.log(res.data);
        setDonationRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id
              ? { ...request, donationStatus: status }
              : request
          )
        );
        toast.success(`Successfully updated donation ${status}`, {
          top: "center",
        });
      })
      .catch((err) => {
        console.error("Error details:", err); // Log the full error object for debugging
        alert("Error updating donation status"); // Display a generic error message
        return;
      });
  };

  // Format donation date to a readable format
  const formatDate = (donationDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const dated = new Date(donationDate);
    return dated.toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-slate-50 p-3">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          My Donation Requests
        </h1>

        {/* Status filter */}
        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="statusFilter" className="text-lg font-medium">
            Status Filter:
          </label>
          <select
            id="statusFilter"
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
            className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Donation Requests Table */}
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className=" bg-white shadow-md rounded-lg table table-xs table-pin-rows">
              <thead className="bg-green-300">
                <tr>
                  <th className="px-6 bg-green-300 py-3 text-center">No</th>
                  <th className="px-6 bg-green-300 py-3 text-center">Recipient Name</th>
                  <th className="px-6 bg-green-300 py-3 text-center">Location</th>
                  <th className="px-6 bg-green-300 py-3 text-center">Date</th>
                  <th className="px-6 bg-green-300 py-3 text-center">Group</th>
                  <th className="px-6 bg-green-300 py-3 text-center">Status</th>
                  <th className="px-6 bg-green-300 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {donationRequests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No donation requests available.
                    </td>
                  </tr>
                ) : (
                  donationRequests.map((request,index) => (
                    <tr
                      key={request._id}
                      className="border-t hover:bg-slate-50 text-center"
                    >
                      <td className="px-6 py-4">{index+1}</td>
                      <td className="px-6 py-4">{request.recipientName}</td>
                      <td className="py-2 text-sm">
                        {request.recipientDistrict}, {request.recipientUpazila}
                      </td>
                      <td className="py-2 text-sm">
                        {formatDate(request?.donationDate)}
                      </td>
                      <td className="px-6 py-4">{request.bloodGroup}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-sm rounded-full ${
                            request.donationStatus === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : request.donationStatus === "inprogress"
                              ? "bg-blue-200 text-blue-800"
                              : request.donationStatus === "done"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {request.donationStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        {request.donationStatus !== "canceled" && (
                          <button
                            onClick={() =>
                              handleStatusChange(request._id, "canceled")
                            }
                            className="px-4 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-2 md:px-4 md:py-2 bg-green-500 text-white rounded-md "
          >
            Previous Page
          </button>
          <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-2 md:px-4 md:py-2 bg-green-500 text-white rounded-md "
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequest;

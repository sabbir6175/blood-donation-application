import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllDonationRequest = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const AxiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AxiosPublic.get("/donationRequest")
      .then((res) => {
        setDonationRequests(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching donation requests");
        setLoading(false);
      });
  }, [AxiosPublic]);

  // ✅ Update Status
  const handleStatusChange = (id, status) => {
    axiosSecure
      .patch(`/donationRequestStatus/${id}`, { donationStatus: status })
      .then(() => {
        setDonationRequests((donationRequests) =>
          donationRequests.map((request) =>
            request._id === id
              ? { ...request, donationStatus: status }
              : request
          )
        );
        toast.success(`Donation ${status} successfully`);
      })
      .catch(() => setError("Error updating donation status"));
  };

  // ✅ Delete Request
  const handleDeleteRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/donationRequest/${id}`)
          .then(() => {
            setDonationRequests((prev) =>
              prev.filter((donation) => donation._id !== id)
            );
            Swal.fire(
              "Deleted!",
              "The donation request has been deleted.",
              "success"
            );
          })
          .catch(() => toast.error("Error deleting donation request"));
      }
    });
  };

  // ✅ Date Format Function
  const formatDate = (donationDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(donationDate).toLocaleDateString("en-US", options);
  };

  // ✅ Pagination Logic
  const totalPages = Math.ceil(donationRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = donationRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ✅ Loading & Error Handling
  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="mt-2 mb-4 text-xl font-bold text-center md:text-2xl lg:text-3xl">
        All Blood Donation Requests ({donationRequests.length})
      </h1>

      <div className="p-4 overflow-x-auto">
        <table className="table border-gray-300 table-xs">
          <thead className="bg-gradient-to-r from-red-200 to-green-100">
            <tr className="text-center">
              <th>No</th>
              <th>Recipient Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Group</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.length > 0 ? (
              currentRequests.map((request, index) => (
                <tr
                  key={request._id}
                  className="text-center transition-colors border-b hover:bg-slate-50"
                >
                  <td>{startIndex + index + 1}</td>
                  <td>{request.recipientName}</td>
                  <td>
                    {request.recipientDistrict}, {request.recipientUpazila}
                  </td>
                  <td>{formatDate(request.donationDate)}</td>
                  <td>{request.bloodGroup}</td>
                  <td className="capitalize">{request.donationStatus}</td>
                  <td className="flex items-center justify-center gap-2 py-2">
                    {request.donationStatus !== "done" && (
                      <button
                        onClick={() => handleStatusChange(request._id, "done")}
                        className="px-3 py-1 text-white bg-green-500 rounded btn-sm hover:bg-green-600"
                      >
                        Approve
                      </button>
                    )}
                    {request.donationStatus !== "canceled" && (
                      <button
                        onClick={() =>
                          handleStatusChange(request._id, "canceled")
                        }
                        className="px-3 py-1 text-white bg-red-500 rounded btn-sm hover:bg-red-600"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteRequest(request._id)}
                      className="px-3 py-1 text-white rounded btn-sm"
                    >
                      <FaTrashAlt className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  No donation requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ Pagination Section */}
        {donationRequests.length > itemsPerPage && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, donationRequests.length)} of{" "}
              {donationRequests.length} results
            </div>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <BsChevronLeft />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 border rounded-md text-sm transition-all duration-200 ${
                        currentPage === pageNum
                          ? "bg-green-500 text-white border-green-600"
                          : "border-gray-300 hover:bg-green-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDonationRequest;

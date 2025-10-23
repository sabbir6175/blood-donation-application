import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const RequestBlood = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const AxiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Fetch all donation requests
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

  // Approve or Reject donation
  const handleStatusChange = (id, status) => {
    const donationToUpdate = donationRequests.find((d) => d._id === id);

    axiosSecure
      .patch(`/donationRequest/${id}`, {
        ...donationToUpdate,
        donationStatus: status,
      })
      .then(() => {
        setDonationRequests((prev) =>
          prev.map((request) =>
            request._id === id
              ? { ...request, donationStatus: status }
              : request
          )
        );
        toast.success(`Donation ${status} successfully`);
      })
      .catch(() => setError("Error updating donation status"));
  };

  // Format date
  const formatDate = (donationDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(donationDate).toLocaleDateString("en-US", options);
  };

  // Pagination logic
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

  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 md:p-8">
      <h1 className="mt-2 mb-4 text-2xl font-bold text-center md:text-3xl">
        All Blood Donation Requests ({donationRequests.length})
      </h1>

      <div className="p-4 overflow-x-auto">
        <table className="table border-gray-300 table-xs table-pin-rows">
          <thead className="text-center bg-gray-100">
            <tr className="bg-gradient-to-r from-red-200 to-green-100">
              <th>No</th>
              <th>Recipient Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Blood Group</th>
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
                  <td className="flex justify-center gap-2">
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

        {/* Pagination */}
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
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2)
                    pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 border rounded-md text-sm transition-all duration-200 ${
                        currentPage === pageNum
                          ? "bg-red-700 text-white border-red-600"
                          : "border-gray-300 hover:bg-gray-200"
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

export default RequestBlood;

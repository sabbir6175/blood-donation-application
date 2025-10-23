import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const DonationRequest = () => {
  const [pendingDonation, setPendingDonation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const AxiosPublic = useAxiosPublic();

  useEffect(() => {
    AxiosPublic.get("/donationRequest").then((res) => {
      const pendingData = res.data.filter(
        (donation) => donation.donationStatus === "pending"
      );
      setPendingDonation(pendingData);
    });
  }, [AxiosPublic]);

  const formatDate = (donationDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const dated = new Date(donationDate);
    return dated.toLocaleDateString("en-US", options);
  };

  // Pagination logic
  const totalPages = Math.ceil(pendingDonation.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDonations = pendingDonation.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 px-6 py-5 md:pt-6">
        <h1 className="text-xl font-bold text-black lg:text-3xl">
          All Pending Requests ({pendingDonation.length})
        </h1>
      </div>

      {/* Table Section */}
      <div className="w-11/12 pb-12 mx-auto">
        {pendingDonation.length !== 0 ? (
          <>
            <div className="pt-6 overflow-x-auto">
              <table className="table table-xs">
                <thead className="text-base font-bold text-black rounded-sm bg-gradient-to-r from-red-200 to-green-100">
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Group</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDonations.map((pending, i) => (
                    <tr className="hover:bg-slate-300" key={pending?._id}>
                      <th>{startIndex + i + 1}</th>
                      <td>{pending?.recipientName}</td>
                      <td>{pending?.fullAddress}</td>
                      <td>{formatDate(pending?.donationDate)}</td>
                      <td>{pending?.bloodGroup}</td>
                      <td className="capitalize">{pending?.donationStatus}</td>
                      <td className="flex items-center gap-2 pb-4">
                        <Link
                          to={`/donationDetails/${pending._id}`}
                          className="flex items-center gap-1 text-green-700 transition-colors hover:text-green-900"
                        >
                          <FaEye className="text-base" title="View" />
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Advanced Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, pendingDonation.length)}{" "}
                of {pendingDonation.length} results
              </div>

              <div className="flex items-center gap-2">
                {/* Previous Button */}
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

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
                >
                  <BsChevronRight />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            <h1 className="pt-10 pb-3 text-xl font-semibold md:pt-0">
              Don't have any pending donation request
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationRequest;

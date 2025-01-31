import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DonationRequest = () => {
  const [pendingDonation, setPendingDonation] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/donationRequest", {
        params: { status: "pending" },
      })
      .then((res) => setPendingDonation(res.data));
  }, []);

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const dated = new Date(date);
    return dated.toLocaleDateString("en-US", options);
  };
  return (
    <>
      <div className="">
        <div className="flex items-center gap-2 py-5 md:pt-6 px-6 justify-center">
          <div>
            <h1 className="text-base lg:text-2xl text-gray-700 font-bold">
              All Pending Donation Requests({pendingDonation.length})
            </h1>
            <p className="text-xs text-red-500 font-medium w-11/12">
              Every Drop Counts. Donate Blood, Save Lives
            </p>
          </div>
        </div>
        <div className="w-11/12 mx-auto pb-12">
          {pendingDonation.length !== 0 ? (
            <>
              <div className="overflow-x-auto pt-6">
                <table className="table table-xs">
                  <thead>
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
                    {pendingDonation.map((pending, i) => (
                      <tr key={pending?._id}>
                        <th>{i + 1}</th>
                        <td>{pending?.requesterName}</td>
                        <td>{pending?.address}</td>
                        <td>{formatDate(pending?.date)}</td>
                        <td>{pending?.blood}</td>
                        <td>{pending?.status}</td>
                        <td className="flex items-center gap-2 pb-4">
                          <Link
                            to={`/donationDetails/${pending._id}`}
                            className="flex items-center gap-1"
                          >
                            <FaEye
                              className="text-base text-green-700"
                              title="View"
                            />
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
              <h1 className="text-xl font-semibold pb-3 pt-10 md:pt-0">
                Don't have any pending donation request
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DonationRequest;

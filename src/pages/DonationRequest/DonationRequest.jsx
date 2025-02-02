
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DonationRequest = () => {
  const [pendingDonation, setPendingDonation] = useState([]);
  const axiosSecure = useAxiosSecure()
//  console.log(pendingDonation)
  useEffect(() => {
    axiosSecure
      .get("/donationRequest")
      .then((res) => {
        // Filter for pending donations if needed
        const pendingData = res.data.filter(donation => donation.donationStatus === 'pending');
        setPendingDonation(pendingData);
      });
  }, [axiosSecure]);

  const formatDate = (donationDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const dated = new Date(donationDate);
    return dated.toLocaleDateString("en-US", options);
  };
  return (
    <>
      <div className="bg-slate-200">
        <div className="flex items-center gap-2 py-5 md:pt-6 px-6 justify-center">
          <div>
            <h1 className="text-base lg:text-4xl text-black font-bold">
              All Pending Donation Requests({pendingDonation.length})
            </h1>
            
          </div>
        </div>
        <div className="w-11/12 mx-auto pb-12">
          {pendingDonation.length !== 0 ? (
            <>
              <div className="overflow-x-auto  pt-6">
                <table className="table table-xs">
                  <thead className="bg-red-200 text-black font-bold text-lg rounded-sm">
                    <tr className="">
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
                      // console.log(pending),
                      <tr className="hover:bg-slate-300 " key={pending?._id}>
                        <th>{i + 1}</th>
                        <td>{pending?.recipientName}</td>
                        <td>{pending?.fullAddress}</td>
                        <td>{formatDate(pending?.donationDate)}</td>
                        <td>{pending?.bloodGroup}</td>
                        <td>{pending?.donationStatus}</td>
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

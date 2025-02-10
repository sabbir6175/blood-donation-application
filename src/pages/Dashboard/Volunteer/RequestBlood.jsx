import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const RequestBlood = () => {
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
    axiosSecure.patch(`/donationRequest/${id}`, { donationStatus: status })
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

export default RequestBlood;








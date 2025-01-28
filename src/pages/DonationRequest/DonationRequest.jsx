
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../AuthContext/AuthContext";

const DonationRequest = () => {
    const {user ,donationRequests} = useContext(AuthContext)
  const pendingRequests = donationRequests.filter((request) => request.status === 'pending');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Pending Blood Donation Requests</h1>

      {pendingRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {pendingRequests.map((request) => (
            <div key={request.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
              <h2 className="text-xl font-semibold">{request.recipientName}</h2>
              <p><strong>Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}</p>
              <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
              <p><strong>Date:</strong> {request.donationDate}</p>
              <p><strong>Time:</strong> {request.donationTime}</p>

              {/* Check if user is logged in and navigate accordingly */}
              <Link
                to={user && user.id ? `/donation-request/${request.id}` : '/login'}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No pending donation requests available.</p>
      )}
    </div>
  );
};

export default DonationRequest;

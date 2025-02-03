import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

const AllBloodDonationRequests = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all donation requests (Replace with your API call)
  useEffect(() => {
    const fetchDonationRequests = async () => {
      try {
        const response = await fetch("http://localhost:7000/donation-requests"); // Replace with your API endpoint
        const data = await response.json();
        setDonationRequests(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donation requests:", error);
        setLoading(false);
      }
    };

    fetchDonationRequests();
  }, []);

  // Handle delete request
  const handleDeleteRequest = (id) => {
    // Handle delete logic (call API to delete request)
    setDonationRequests(donationRequests.filter((request) => request.id !== id));
  };

  // Handle mark request as completed
  const handleCompleteRequest = (id) => {
    // Handle mark completed logic (API call to update request)
    const updatedRequests = donationRequests.map((request) => {
      if (request.id === id) {
        return { ...request, status: "Completed" };
      }
      return request;
    });
    setDonationRequests(updatedRequests);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">All Blood Donation Requests</h1>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2">Donor Name</th>
              <th className="py-2">Blood Group</th>
              <th className="py-2">Location</th>
              <th className="py-2">Request Date</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donationRequests.map((request) => (
              <tr key={request.id}>
                <td className="py-2">{request.donorName}</td>
                <td className="py-2">{request.bloodGroup}</td>
                <td className="py-2">{request.location}</td>
                <td className="py-2">{new Date(request.date).toLocaleDateString()}</td>
                <td className="py-2">
                  {request.status === "Completed" ? (
                    <span className="text-green-500">Completed</span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </td>
                <td className="py-2">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => alert("Edit Request")}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 mr-2"
                    onClick={() => handleDeleteRequest(request.id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="text-green-500"
                    onClick={() => handleCompleteRequest(request.id)}
                  >
                    <FaCheckCircle />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBloodDonationRequests;
// 
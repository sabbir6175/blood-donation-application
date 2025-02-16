import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AuthContext from "../../../AuthContext/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/donationRequest")
      .then((res) => {
        // Filter donations by status and email
        const filteredDonations = res.data.filter(
          (donation) =>
            donation.donationStatus === "inprogress" &&
            donation.requesterEmail === user.email
        );
        setDonations(filteredDonations);
      })
      .catch((err) => {
        console.error("Error fetching donations:", err);
        toast.error("Error loading donations", { top: "center" });
      });
  }, [axiosSecure, user.email]);

  const handleStatusChange = (id, status) => {
    axiosSecure
      .put(`/donationRequestStatus/${id}`, { donationStatus: status })
      .then((res) => {
        setDonations((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id ? { ...request, donationStatus: status } : request
          )
        );
        toast.success(`Successfully updated donation ${status}`, {
          top: "center",
        });
      })
      .catch((err) => {
        console.error("Error details:", err);
        toast.error("Error updating donation status", {
          top: "center",
        });
      });
  };

  const formatDate = (donationDate) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const dated = new Date(donationDate);
    return dated.toLocaleDateString("en-US", options);
  };

  const handleDeleteRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
            setDonations(donations.filter((donation) => donation._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "The donation request has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.error("Error details:", err);
            toast.error("Error deleting donation request", { top: "center" });
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 uppercase text-center py-5">
        Welcome, {user.displayName}!
      </h1>

      {donations.length > 0 ? (
        <table className="min-w-full bg-white shadow-2xl rounded-lg overflow-hidden">
          <thead className="bg-green-300">
            <tr>
              <th className="text-center text-black text-sm font-bold py-2">No</th>
              <th className="text-center text-black text-sm font-bold py-2">Recipient Name</th>
              <th className="text-center text-black text-sm font-bold py-2">Location</th>
              <th className="text-center text-black text-sm font-bold py-2">Date</th>
              <th className="text-center text-black text-sm font-bold py-2">Blood Group</th>
              <th className="text-center text-black text-sm font-bold py-2">Status</th>
              <th className="text-center text-black text-sm font-bold py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.slice(0, 3).map((donation, index) => (
              <tr key={donation._id} className="text-center">
                <td className="py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="py-4 text-sm text-gray-900">{donation.recipientName}</td>
                <td className="py-4 text-sm text-gray-900">
                  {donation.recipientDistrict}, {donation.recipientUpazila}
                </td>
                <td className="py-4 text-sm text-gray-900">
                  {formatDate(donation?.donationDate)}
                </td>
                <td className="py-4 text-sm text-gray-900">{donation.bloodGroup}</td>
                <td className="py-4 text-sm text-gray-900">{donation.donationStatus}</td>
                <td className="py-4 text-sm text-gray-900">
                  {donation.donationStatus === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleDeleteRequest(donation._id)}
                        className="bg-red-500 text-white py-1 mr-2 px-3 rounded"
                      >
                        Delete
                      </button>
                      {donation.donationStatus !== "canceled" && (
                        <button
                          onClick={() => handleStatusChange(donation._id, "canceled")}
                          className="bg-red-500 btn-sm text-white rounded"
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  )}
                  <Link to={`/dashboard/Update/${donation._id}`}>
                    <button className="bg-blue-500 text-white py-1 px-3 rounded ml-2">
                      Edit
                    </button>
                  </Link>
                  <Link to={`/donationDetails/${donation._id}`}>
                    <button className="bg-yellow-500 text-white py-1 px-3 rounded ml-2">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No donation requests found.</p>
      )}

      <Link to="/dashboard/my-donation-requests">
        <button className="mt-6 bg-green-600 font-bold py-2 px-4 rounded">
          View My All Requests
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;

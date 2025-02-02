

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal"; // Assuming you have a modal component
import { useContext } from "react";
import AuthContext from "../../AuthContext/AuthContext";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const DonationDetails = () => {
  const { id } = useParams(); // Get the donation request ID from the URL
  const { loading, user } = useContext(AuthContext);
  // console.log(user.displayName)
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  const [request, setRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requesterName] = useState(user ? user.displayName : ""); // Donor name (readonly, logged-in user)
  const [requesterEmail] = useState(user ? user.email : ""); // Donor email (readonly, logged-in user)

  // Fetch the donation request details when the component mounts
  useEffect(() => {
    
    axiosSecure
      .get(`/donationRequest/${id}`)
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch request details:", err);
      });
  }, [id, axiosSecure, loading, navigate]);

  // Handle opening and closing the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle the form submission and update the status
  const handleDonate = () => {
    axiosSecure
      .put(`/donationRequest/${id}`, {
        requesterName,
        requesterEmail,
      })
      .then((res) => {
        console.log(res)
        toast.success("Donation confirmed!",{
          top: 'center'
        });
        setIsModalOpen(false); // Close the modal
        setRequest({ ...request, donationStatus: "inprogress" });
        navigate('/donationRequest')
      })
      .catch((error) => {
        console.error("Failed to confirm donation:", error);
        toast.warn("Something went wrong, please try again.");
      });
  };

  if (!request) {
    return <p>Loading request details...</p>;
  }

  return (
    <div className="container mx-auto pb-10 p-4 bg-slate-200">
      <h2 className="text-4xl font-bold my-10 text-center  ">Welcome Donation Request</h2>

      <div className="mt-4 p-4 bg-white shadow-md mx-auto rounded-md md:w-96">
        <div className="w-full mb-5 h-52"> 
          <img className="w-full h-full" src="https://i.ibb.co.com/274cVp87/images.jpg" alt="" />
        </div>
        <h3 ><strong className="text-lg">Request by:</strong> {request.recipientName}</h3>
        <p><strong className="text-lg">Location:</strong> {request.fullAddress}</p>
        <p><strong className="text-lg">Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong className="text-lg">Hospital:</strong> {request.hospitalName}</p>
        <p><strong className="text-lg">Date:</strong> {new Date(request.donationDate).toLocaleDateString()}</p>
        <p><strong className="text-lg">Time:</strong> {request.donationTime}</p>
        <p><strong className="text-lg">Status:</strong> {request.donationStatus}</p>
        <p><strong className="text-lg">Message:</strong> {request.requestMessage}</p>

        {/* Button to open the modal */}
        {request.donationStatus === "pending" && (
          <button
            className="mt-4 w-full bg-red-600 font-bold text-white p-2 rounded"
            onClick={handleOpenModal}
          >
            Donate
          </button>
        )}
      </div>

      {/* Modal for confirming donation */}
      {isModalOpen && (
        <Modal>
          <div className="p-2">
            <h3 className="text-xl font-bold text-center  my-5">Confirm Your Donation</h3>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Donor Name : </label>
                <input
                  type="text"
                  value={requesterName}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Donor Email : </label>
                <input
                  type="email"
                  value={requesterEmail}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <button
                type="button"
                className="bg-green-500 text-white p-2 rounded"
                onClick={handleDonate}
              >
                Confirm Donation
              </button>

              <button
                type="button"
                className="bg-gray-300 text-black p-2 rounded ml-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DonationDetails;

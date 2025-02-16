import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../AuthContext/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import District from "../../../Hooks/District";
import Upazila from "../../../Hooks/Upazila";

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [districts] = District();
  const [upazilas] = Upazila()

  const [formData, setFormData] = useState({
    requesterName: "",
    requesterEmail: "",
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
    donationStatus: "pending", // Default status
  });

  const [isBlocked, setIsBlocked] = useState(false);

  // Effect to fetch user data
  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      requesterName: user.displayName,
      requesterEmail: user.email,
    }));

    if (user.status === "blocked") {
      setIsBlocked(true);
    }
  }, [user.displayName, user.email, user.status]);

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBlocked) {
      alert("You are blocked and cannot create a donation request.");
      return;
    }

    try {
      const response = await axiosSecure.post("/donation-requests", formData);
      console.log(response.data);
      toast.success("Create Donation request successfully!", {
        top: "center",
      });
    } catch (error) {
      console.error("Error submitting donation request", error);
      alert("There was an error submitting the request.");
    }
  };

  return (
    <div className="container mx-auto bg-slate-100 p-4">
      <h1 className="text-3xl font-bold text-center  mb-6">
        Create Donation Request
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 shadow-2xl rounded-md border-2 p-4"
      >
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="w-full lg:w-1/2 ">
            <label className="block font-medium">Requester Name : </label>
            <input
              type="text"
              name="requesterName"
              value={formData.requesterName}
              readOnly
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <label className="block font-medium">Requester Email : </label>
            <input
              type="email"
              name="requesterEmail"
              value={formData.requesterEmail}
              readOnly
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
       <div className="flex flex-col md:flex-row w-full gap-5">
       <div className="w-full lg:w-1/2">
          <label className="block font-medium">Recipient Name : </label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <label className="block font-medium">Recipient District : </label>
          <select
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
             <option value="">Select District</option>
              {districts.length > 0 ? (
                districts.map((districtData) => (
                  <option key={districtData.id} value={districtData.name}>
                    {districtData.name}
                  </option>
                ))
              ) : (
                <option>Loading...</option>
              )}
          </select>
        </div>
       </div>
        <div className="flex flex-col md:flex-row w-full gap-5">
                
        <div className="w-full lg:w-1/2">
          <label className="block font-medium">Recipient Upazila : </label>
          <select
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Upazila</option>
           {upazilas.length > 0 ? (
                upazilas.map((upazilaData) => (
                  <option key={upazilaData.id} value={upazilaData.name}>
                    {upazilaData.name}
                  </option>
                ))
              ) : (
                <option>Loading...</option>
              )}
          </select>
        </div>
        <div className="w-full lg:w-1/2">
          <label className="block font-medium">Hospital Name : </label>
          <input
            type="text"
            name="hospitalName"
            placeholder="Please provide Hospital Name"
            value={formData.hospitalName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        </div>

       <div className="flex flex-col md:flex-row w-full gap-5">
       <div className="w-full lg:w-1/2">
          <label className="block font-medium">Full Address : </label>
          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            placeholder="Please provide full address"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <label className="block font-medium">Blood Group : </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
       </div>

        <div className="flex flex-col md:flex-row w-full gap-5">
        <div className="w-full lg:w-1/2">
          <label className="block font-medium">Donation Date : </label>
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <label className="block font-medium">Donation Time : </label>
          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        </div>
        <div>
          <label className="block font-medium">Request Message : </label>
          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            placeholder="Please request message provide?"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-red-600 text-white rounded-md mt-4"
          disabled={isBlocked}
        >
          {isBlocked ? "You are Blocked" : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;

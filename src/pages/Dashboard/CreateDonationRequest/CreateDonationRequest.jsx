import  { useState, useEffect, useContext } from "react";
import AuthContext from "../../../AuthContext/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CreateDonationRequest = () => {
    const {user } =useContext(AuthContext)
    const axiosSecure =useAxiosSecure()
    
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
  }, [user.displayName ,user.email,user.status ,]);

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
      toast.success("Create Donation request successfully!",{
        top:'center'
      });
     
    } catch (error) {
      console.error("Error submitting donation request", error);
      alert("There was an error submitting the request.");
    }
  };

  return (
    <div className="container mx-auto bg-slate-50 p-4">
      <h1 className="text-3xl font-bold text-center  mb-6">Create Donation Request</h1>
      <form onSubmit={handleSubmit} className="space-y-4 shadow-2xl rounded-md border-2 p-4 max-w-2xl mx-auto">
        <div>
          <label className="block font-medium">Requester Name : </label>
          <input
            type="text"
            name="requesterName"
            value={formData.requesterName}
            readOnly
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium">Requester Email : </label>
          <input
            type="email"
            name="requesterEmail"
            value={formData.requesterEmail}
            readOnly
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
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
        <div>
          <label className="block font-medium">Recipient District : </label>
          <select
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
                <option value="">Select District</option>
                <option value="Bagerhat">Bagerhat</option>
                <option value="Bandarban">Bandarban</option>
                <option value="Barisal">Barisal</option>
                <option value="Bhola">Bhola</option>
                <option value="Bogra">Bogra</option>
                <option value="Brahmanbaria">Brahmanbaria</option>
                <option value="Chandpur">Chandpur</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Chuadanga">Chuadanga</option>
                <option value="Cumilla">Cumilla</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Dinajpur">Dinajpur</option>
                <option value="Faridpur">Faridpur</option>
                <option value="Feni">Feni</option>
                <option value="Gaibandha">Gaibandha</option>
                <option value="Gazipur">Gazipur</option>
                <option value="Gopalganj">Gopalganj</option>
                <option value="Habiganj">Habiganj</option>
                <option value="Jamuna">Jamuna</option>
                <option value="Jamalpur">Jamalpur</option>
                <option value="Jashore">Jashore</option>
                <option value="Jhalokathi">Jhalokathi</option>
                <option value="Jhenaidah">Jhenaidah</option>
                <option value="Khagrachari">Khagrachari</option>
                <option value="Khulna">Khulna</option>
                <option value="Kishoreganj">Kishoreganj</option>
                <option value="Kurigram">Kurigram</option>
                <option value="Kushtia">Kushtia</option>
                <option value="Lakshmipur">Lakshmipur</option>
                <option value="Lalmonirhat">Lalmonirhat</option>
                <option value="Manikganj">Manikganj</option>
                <option value="Meherpur">Meherpur</option>
                <option value="Moulvibazar">Moulvibazar</option>
                <option value="Munshiganj">Munshiganj</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Naogaon">Naogaon</option>
                <option value="Narail">Narail</option>
                <option value="Narayanganj">Narayanganj</option>
                <option value="Narsingdi">Narsingdi</option>
                <option value="Netrokona">Netrokona</option>
                <option value="Nilphamari">Nilphamari</option>
                <option value="Noakhali">Noakhali</option>
                <option value="Pabna">Pabna</option>
                <option value="Panchagarh">Panchagarh</option>
                <option value="Patuakhali">Patuakhali</option>
                <option value="Pirojpur">Pirojpur</option>
                <option value="Rajbari">Rajbari</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Rangamati">Rangamati</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Satkhira">Satkhira</option>
                <option value="Shariatpur">Shariatpur</option>
                <option value="Sherpur">Sherpur</option>
                <option value="Sirajganj">Sirajganj</option>
                <option value="Sunamganj">Sunamganj</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Tangail">Tangail</option>
                <option value="Thakurgaon">Thakurgaon</option>
              
          </select>
        </div>
        <div>
          <label className="block font-medium">Recipient Upazila : </label>
          <select
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
                <option value="">Select Upazila</option>
                <option value="Mithapukur">Mithapukur</option>
                <option value="Pirgonj">Pirgonj</option>
                <option value="Kaunia">Kaunia</option>
                <option value="Pirgacha">Pirgacha</option>
                <option value="Panchagarh Sadar">Panchagarh Sadar</option>
                <option value="Birganj">Birganj</option>
                <option value="Dinajpur Sadar">Dinajpur Sadar</option>
                <option value="Thakurgaon Sadar">Thakurgaon Sadar</option>
                <option value="Kamalganj">Kamalganj</option>
                <option value="Cumilla">Cumilla</option>
                <option value="Cox's Bazar">Cox's Bazar</option>
                <option value="Brahmanbaria">Brahmanbaria</option>
                <option value="Tangail">Tangail</option>
                <option value="Faridpur">Faridpur</option>
                <option value="Feni">Feni</option>
                <option value="Gaibandha">Gaibandha</option>
                <option value="Habiganj">Habiganj</option>
                <option value="Moulvibazar">Moulvibazar</option>
                <option value="Jhalokathi">Jhalokathi</option>
                <option value="Jhenaidah">Jhenaidah</option>
                <option value="Khulna">Khulna</option>
                <option value="Kurigram">Kurigram</option>
                <option value="Kushtia">Kushtia</option>
                <option value="Lakshmipur">Lakshmipur</option>
                <option value="Lalmonirhat">Lalmonirhat</option>
                <option value="Manikganj">Manikganj</option>
                <option value="Meherpur">Meherpur</option>
                <option value="Munshiganj">Munshiganj</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Naogaon">Naogaon</option>
                <option value="Narail">Narail</option>
                <option value="Narayanganj">Narayanganj</option>
                <option value="Narsingdi">Narsingdi</option>
                <option value="Netrokona">Netrokona</option>
                <option value="Nilphamari">Nilphamari</option>
                <option value="Noakhali">Noakhali</option>
                <option value="Pabna">Pabna</option>
                <option value="Panchagarh">Panchagarh</option>
                <option value="Patuakhali">Patuakhali</option>
                <option value="Pirojpur">Pirojpur</option>
                <option value="Rajbari">Rajbari</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Rangamati">Rangamati</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Satkhira">Satkhira</option>
                <option value="Shariatpur">Shariatpur</option>
                <option value="Sherpur">Sherpur</option>
                <option value="Sirajganj">Sirajganj</option>
                <option value="Sunamganj">Sunamganj</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Tangail">Tangail</option>
                <option value="Thakurgaon">Thakurgaon</option>
          </select>
        </div>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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

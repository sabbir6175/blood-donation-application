import { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import District from '../../Hooks/District';
import Upazila from '../../Hooks/Upazila';
import { motion } from "framer-motion";

const SearchPage = () => {
  // State for form inputs
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [donors, setDonors] = useState([]);

  // State for districts and upazilas
  const [districts]=District()
  const [upazilas]=Upazila()
  

  // Fetch donation requests (pending donations)
  const [pendingDonation, setPendingDonation] = useState([]);
  const AxiosPublic = useAxiosPublic();

  // console.log(districts)
  useEffect(() => {
    // Fetch donation requests
    AxiosPublic
      .get("/donationRequest")
      .then((res) => {
        // console.log(res.data);
        setPendingDonation(res.data); // Store the donation data
      });

  
  }, [AxiosPublic]);

  // Handle search form submission
  const handleSearch = () => {
    const filteredDonors = pendingDonation.filter((donor) => {
      return (
        (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
        (district ? donor.district === district : true) &&
        (upazila ? donor.upazila === upazila : true)
      );
    });
    setDonors(filteredDonors);
  };

  return (
    <div className=" px-4 pb-10" >
      {/* Search Form */}
      
      <div className=" flex flex-col items-center justify-center  p-5" style={{
      backgroundImage: "url(https://i.ibb.co.com/d0yq9w2Y/testimony-feat-bg.webp)",
    }}>
        <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-center uppercase text-black">Search for Blood Donors</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Blood Group */}
          <div>
            <label htmlFor="bloodGroup" className="block text-lg md:text-2xl font-medium mb-2">Blood Group</label>
            <select
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full p-3 border  rounded-lg"
              required
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

          {/* District */}
          <div>
            <label htmlFor="district" className="block text-lg md:text-2xl  font-medium mb-2">District</label>
            <select
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
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

          {/* Upazila */}
          <div>
            <label htmlFor="upazila" className="block text-lg md:text-2xl  font-medium mb-2">Upazila</label>
            <select
              id="upazila"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
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

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Search Donors
          </button>
        </form>
      </div>

      {/* Donor List */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-red-600">Donor List :</h3>
        {donors.length === 0 ? (
          <p>No donors found based on your search criteria.</p>
        ) : (
          <div className="space-y-4 grid-cols-1  ">
            {donors.map((donor) => (
              <div key={donor.id} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-medium">{donor.recipientName}</h4>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>District: {donor.recipientDistrict}</p>
                <p>Upazila: {donor.recipientUpazila}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
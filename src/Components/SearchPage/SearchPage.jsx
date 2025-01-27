import  { useState } from 'react';

const SearchPage = () => {
  // State for form inputs
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [donors, setDonors] = useState([]);
  
  // Example donor data (This can be fetched from an API)
  const exampleDonors = [
    { id: 1, name: 'John Doe', bloodGroup: 'A+', district: 'Dhaka', upazila: 'Dhanmondi' },
    { id: 2, name: 'Jane Smith', bloodGroup: 'B-', district: 'Chittagong', upazila: 'Patiya' },
    { id: 3, name: 'Michael Johnson', bloodGroup: 'O+', district: 'Khulna', upazila: 'Rupsha' },
    // Add more dummy data as needed
  ];

  // Handle form submission
  const handleSearch = () => {
    const filteredDonors = exampleDonors.filter((donor) => {
      return (
        (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
        (district ? donor.district === district : true) &&
        (upazila ? donor.upazila === upazila : true)
      );
    });
    setDonors(filteredDonors);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Search Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Search for Blood Donors</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Blood Group */}
          <div>
            <label htmlFor="bloodGroup" className="block text-lg font-medium mb-2">Blood Group</label>
            <select
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
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
            <label htmlFor="district" className="block text-lg font-medium mb-2">District</label>
            <select
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select District</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Khulna">Khulna</option>
              {/* Add more districts */}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label htmlFor="upazila" className="block text-lg font-medium mb-2">Upazila</label>
            <select
              id="upazila"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select Upazila</option>
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Patiya">Patiya</option>
              <option value="Rupsha">Rupsha</option>
              {/* Add more upazilas */}
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
        <h3 className="text-xl font-semibold mb-4">Donor List</h3>
        {donors.length === 0 ? (
          <p>No donors found based on your search criteria.</p>
        ) : (
          <div className="space-y-4">
            {donors.map((donor) => (
              <div key={donor.id} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-medium">{donor.name}</h4>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>District: {donor.district}</p>
                <p>Upazila: {donor.upazila}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

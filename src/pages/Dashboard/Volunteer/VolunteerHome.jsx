import { useContext,  useEffect,  useState } from "react";
import { FaHandHoldingUsd, FaUsers } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../../AuthContext/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const VolunteerHome = () => {
  // Context for user info
  const { user } = useContext(AuthContext);
  const [donationRequest, setDonationRequests] = useState([])

  const totalFunding = "To do : Process"; // Total amount donated

  // Axios hook for public API calls
  const AxiosPublic = useAxiosPublic();
  const AxiosSecure = useAxiosSecure();

  useEffect(() => {
    AxiosPublic.get('/donationRequest/data')
      .then(res => {
        setDonationRequests(res.data); // Set the filtered donations
      })
      .catch(error => {
        console.error('Error fetching donation data:', error);
      });
  }, [AxiosPublic]);
  
  

  // Fetching users with TanStack Query
  const { data: userData, error: userError, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await AxiosSecure.get('/volunteer/user');
      return response.data.users; // Returns the list of users
    },
  });


 
  // Filter donors and volunteers
  const donors = userData ? userData.filter(user => user.role === 'donor') : [];
  const volunteer = userData ? userData.filter(user => user.role === 'volunteer') : [];

  if ( userLoading) {
    return <div>Loading...</div>;
  }



  if (userError) {
    return <div>Error fetching users: {userError.message}</div>;
  }

  return (
    <div className="p-4 md:p-8 mt-20 md:mt-0 bg-slate-50">
      {/* Welcome Section */}
      <div className="text-black p-6 rounded-lg mb-8">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center uppercase">Welcome {user.displayName}!</h1>
      </div>

      {/* Featured Cards Section */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 shadow p-5 bg-slate-200 gap-6">
        
        {/* Total Donors Card */}
        <div className="bg-white shadow-lg rounded-lg p-2 md:p-6 flex items-center justify-between">
          <div className="flex items-center   md:gap-10">
            <FaUsers className="text-3xl text-orange-500 mr-4" />
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-base md:text-xl font-bold">Total Donors</h3>
              <p className="text-base md:text-xl font-bold">{donors.length}</p> {/* Displaying the number of donors */}
            </div>
          </div>
        </div>

        {/* Total Volunteers Card */}
        <div className="bg-white shadow-lg rounded-lg p-2 md:p-6 flex items-center justify-between">
          <div className="flex items-center md:gap-10">
            <FaUsers className="text-3xl text-orange-500 mr-4" />
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-base md:text-xl  font-bold">Total Volunteer</h3>
              <p className="text-base md:text-xl font-bold">{volunteer.length}</p> {/* Displaying the number of volunteers */}
            </div>
          </div>
        </div>

         {/* Total Blood Donation Requests Card */}
         <div className="bg-white shadow-lg rounded-lg p-2 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-5 md:gap-10">
            {/* <FaHeartbeat className="text-3xl text-red-500 mr-4" /> */}
            <img className="w-10 rounded-tr-box h-10" src="https://i.ibb.co/274cVp87/images.jpg" alt="" />
            <div>
              <h3 className="text-base md:text-xl  font-bold">Total Blood Requests</h3>
              <p className="text-base md:text-xl font-bold text-center">{donationRequest.length}</p> {/* Displaying the number of pending donations */}
            </div>
          </div>
        </div>
        
        {/* Total Funding Card */}
        <div className="bg-white shadow-lg rounded-lg p-2 md:p-6 flex items-center justify-between">
          <div className="flex items-center md:gap-10">
            <FaHandHoldingUsd className="text-3xl  text-green-500 mr-4" />
            <div>
              <h3 className="text-base md:text-xl font-bold">Total Funding</h3>
              <p className="text-base font-bold">${totalFunding}</p>
            </div>
          </div>
        </div>
        
       

      </div>
    </div>
  );
};

export default VolunteerHome;

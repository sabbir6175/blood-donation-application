import { useState, useEffect } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const Card = () => {
  // Fetch the donation request details when the component mounts
  const [pendingDonationAll, setPendingDonation] = useState([]);
  const [visibleCards, setVisibleCards] = useState(4); // Initially show 7 cards
  const AxiosPublic = useAxiosPublic();

  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({ duration: 1000 });

    // Fetch donation request data
    AxiosPublic.get("/donationRequest").then((res) => {
      // Filter for pending donations if needed
      setPendingDonation(res.data);
    });

    // Cleanup AOS when the component unmounts
    return () => AOS.refresh();
  }, [AxiosPublic]);

  // Function to show all cards
  const showAllCards = () => {
    setVisibleCards(pendingDonationAll.length); // Show all cards
  };

  return (
    <div className="container mx-auto pb-10 p-4">
      <div className="my-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-center text-[#000000]">
          !-- Blood Request --!
        </h2>
        <img
          className="w-82 mx-auto"
          src="https://i.ibb.co.com/RkDvFz6n/separator.webp"
          alt=""
        />
      </div>

      <div className=" mt-4 p-4 mx-auto rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {pendingDonationAll.slice(0, visibleCards).map((pendingDonation) => (
        <div
        key={pendingDonation._id}
        data-aos="flip-up"
        className="border-2 p-4 shadow-2xl group hover:shadow-xl hover:scale-105 transition-all duration-300" // Added hover effects for smooth transition
      >
        <div className="w-full mb-5 h-52 group-hover:translate-y-[-10px] transition-transform duration-300 ease-in-out"> {/* Applied translation on hover */}
          <img
            className="w-full h-full object-cover" // Added object-cover to maintain image aspect ratio
            src="https://i.ibb.co.com/cXpR7WZc/blood-2.jpg"
            alt="Blood Donation"
          />
        </div>
        <h3>
          <strong className="md:text-base lg:text-lg">Request by:</strong> {pendingDonation.recipientName}
        </h3>
        <p>
          <strong className="md:text-base lg:text-lg">Location:</strong> {pendingDonation.fullAddress}
        </p>
        <p>
          <strong className="md:text-base lg:text-lg">Blood Group:</strong> {pendingDonation.bloodGroup}
        </p>
        <p>
          <strong className="md:text-base lg:text-lg">Hospital:</strong> {pendingDonation.hospitalName}
        </p>
        <p>
          <strong className="md:text-base lg:text-lg">Address:</strong> {pendingDonation.fullAddress}
        </p>
        <p>
          <strong className="md:text-base lg:text-lg">Date:</strong> {new Date(pendingDonation.donationDate).toLocaleDateString()}
        </p>
        <p>
          <strong className="md:text-base lg:text-lg">Time:</strong> {pendingDonation.donationTime}
        </p>
        <p>
          <strong className="md:text-base lg:text-lg">Status:</strong> {pendingDonation.donationStatus}
        </p>
        <p>
          <strong className="md:text-base lg:text-lg">Message:</strong> {pendingDonation.requestMessage}
        </p>
      
        <Link to={`/donationDetails/:${pendingDonation._id}`}>
          <button className="mt-4 w-full bg-green-400 font-bold text-white p-2 rounded">
            Donate
          </button>
        </Link>
      </div>
      
        ))}
      </div>
    </div>
  );
};

export default Card;

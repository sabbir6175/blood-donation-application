import { useState, useEffect } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Card = () => {
  // console.log(user.displayName)

  // Fetch the donation request details when the component mounts
  const [pendingDonationAll, setPendingDonation] = useState([]);
  const AxiosPublic = useAxiosPublic();
  //  console.log(pendingDonation)
  useEffect(() => {
    AxiosPublic.get("/donationRequest").then((res) => {
      // Filter for pending donations if needed

      setPendingDonation(res.data);
    });
  }, [AxiosPublic]);

//   console.log(pendingDonationAll);

  return (
    <div className="container mx-auto pb-10 p-4 bg-slate-200">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold my-10 text-center  ">Blood Request</h2>

      <div className="mt-4 p-4 bg-white shadow-md mx-auto rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pendingDonationAll.map((pendingDonation) => (
          <div
            key={pendingDonation._id}
            className="border-2 p-4 shadow-2xl group-hover:"
          >
            <div className="w-full mb-5 h-52">
              <img
                className="w-full h-full"
                src="https://i.ibb.co.com/cXpR7WZc/blood-2.jpg"
                alt=""
              />
            </div>
            <h3>
              <strong className="md:text-base lg:text-lg">Request by:</strong>{" "}
              {pendingDonation.recipientName}
            </h3>
            <p>
              <strong className="md:text-base lg:text-lg">Location:</strong>{" "}
              {pendingDonation.fullAddress}
            </p>
            <p>
              <strong className="md:text-base lg:text-lg">Blood Group:</strong>{" "}
              {pendingDonation.bloodGroup}
            </p>
            <p>
              <strong className="md:text-base lg:text-lg">Hospital:</strong>{" "}
              {pendingDonation.hospitalName}
            </p>
            <p>
              <strong className="md:text-base lg:text-lg">Address:</strong>{" "}
              {pendingDonation.fullAddress}
            </p>
            <p>
              <strong className="md:text-base lg:text-lg">Date:</strong>{" "}
              {new Date(pendingDonation.donationDate).toLocaleDateString()}
            </p>
            <p>
              <strong className="md:text-base lg:text-lg">Time:</strong>{" "}
              {pendingDonation.donationTime}
            </p>
            <p>
              <strong className="md:text-base lg:text-lg">Status:</strong>{" "}
              {pendingDonation.donationStatus}
            </p>
            <p>
              <strong className="md:text-base lg:text-lg">Message:</strong>{" "}
              {pendingDonation.requestMessage}
            </p>

            {/* Button to open the modal */}

            <Link to={`/donationDetails/:${pendingDonation._id}`}>
              <button className="mt-4 w-full bg-red-600 font-bold text-white p-2 rounded">
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

import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout"; // For Stripe integration
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AuthContext from "../../AuthContext/AuthContext";
import Pagination from "../../Hooks/Pagination";
 // Custom Pagination Component

const FundingPage = () => {
  const { user } = useContext(AuthContext); // To get logged-in user's info
  const [funds, setFunds] = useState([]); // List of funds
  const [totalFunds, setTotalFunds] = useState(0); // Total funds raised
  const [page, setPage] = useState(1); // Pagination page
  const [fundAmount, setFundAmount] = useState(""); // Amount entered by user
  const axiosSecure = useAxiosSecure();

  // Fetch funds and total funds when the page is changed
  // useEffect(() => {
  //   axiosSecure.get(`/funds?page=${page}`)
  //     .then((res) => {
  //       setFunds(res.data.funds);
  //       setTotalFunds(res.data.totalFunds);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching funds:", err);
  //       toast.error("Error fetching funds", { top: "center" });
  //     });
  // }, [page]);

  const handleFundSubmit = (token) => {
    // Handle the fund submission via Stripe token
    const donationFunding = {
      amount: fundAmount,
      token: token.id,
      userEmail: user.email,
    }
    console.log(donationFunding)
    axiosSecure.post("/funding",donationFunding )
      .then((res) => {
        toast.success("Successfully donated!", { top: "center" });
        setFundAmount(""); // Reset the input
        setTotalFunds(prev => prev + parseFloat(fundAmount)); // Update total funds locally
      })
      .catch((err) => {
        console.error("Error making payment:", err);
        toast.error("Payment failed. Please try again.", { top: "center" });
      });
  };

  const handleAmountChange = (e) => {
    setFundAmount(e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 uppercase text-center py-5">
        Funding Page
      </h1>

      {/* Give Fund Button */}
      <div className="mb-6 flex justify-center">
        <StripeCheckout
          stripeKey={`${import.meta.env.VITE_YOUR_STRIPE_PUBLIC_KEY}`}
          token={handleFundSubmit}
          amount={fundAmount * 100} // Stripe expects amount in cents
          name="Donate to the Organization"
          description="Help us support our cause."
        >
          <button className="bg-green-600 text-white py-2 px-4 rounded">
            Give Fund
          </button>
        </StripeCheckout>
      </div>

      {/* Fund Amount Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="number"
          className="border px-4 py-2 rounded"
          placeholder="Enter amount"
          value={fundAmount}
          onChange={handleAmountChange}
        />
      </div>

      {/* Display Total Funds */}
      <div className="text-center mb-6 font-semibold text-xl">
        <p>Total Funds : ${totalFunds}</p>
      </div>

      {/* Displaying Funding Table */}
      {/* {funds.length > 0 ? ( */}
        <table className="min-w-full bg-white shadow-2xl rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-red-200 to-green-100 ">
            <tr>
              <th className="text-center text-black text-sm font-bold py-2">No</th>
              <th className="text-center text-black text-sm font-bold py-2">User Name</th>
              <th className="text-center text-black text-sm font-bold py-2">Amount</th>
              <th className="text-center text-black text-sm font-bold py-2">Funding Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, index) => (
              <tr key={fund._id} className="text-center">
                <td className="py-4 text-sm text-gray-900">{index + 1}</td>
                <td className="py-4 text-sm text-gray-900">{fund.userEmail}</td>
                <td className="py-4 text-sm text-gray-900">${fund.amount}</td>
                <td className="py-4 text-sm text-gray-900">
                  {new Date(fund.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* ) : (
        <p>No funds available.</p>
      )} */}

      {/* Pagination Component */}
      <Pagination
        totalItems={totalFunds}
        itemsPerPage={10}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)} // Handle page change
      />
    </div>
  );
};

export default FundingPage;

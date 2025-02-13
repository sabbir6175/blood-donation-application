import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const Funding = () => {
  const [funds, setFunds] = useState([]);
  const [amount, setAmount] = useState('');
  const [totalFunds, setTotalFunds] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:7000/api/funds?page=${page}`)
      .then((response) => {
        setFunds(response.data.funds);
        setTotalFunds(response.data.totalFunds);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const handleDonate = async () => {
    const stripe = await stripePromise;

    const { data: { sessionId } } = await axios.post('http://localhost:7000/api/create-checkout-session', { amount });

    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      alert(result.error.message);
    } else {
      alert('Redirecting to Stripe checkout...');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 mb-20">
      <h1 className="text-2xl font-bold mb-4">Funding Page</h1>

      {/* Total Funds Display */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Total Funds: ${totalFunds}</h3>
      </div>

      {/* Donation Button */}
      <div className="mb-4">
        <button
          onClick={handleDonate}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Give Fund
        </button>
      </div>

      {/* Table of Donations */}
      <table className="min-w-full border-collapse table-auto mb-10">
        <thead>
          <tr>
            <th className="border p-2">User</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((fund) => (
            <tr key={fund._id}>
              <td className="border p-2">{fund.user}</td>
              <td className="border p-2">${fund.amount}</td>
              <td className="border p-2">{new Date(fund.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 text-black py-2 px-4 rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-gray-300 text-black py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Funding;

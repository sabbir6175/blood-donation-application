

// const AllDonationRequest = () => {
//     return (
//         <div>
//             <h1> Admin panel all donation request</h1>
            
//         </div>
//     );
// };

// export default AllDonationRequest;

// import  { useState, useEffect } from 'react';
// import axios from 'axios';
 // For routing

const AllDonationRequest = () => {
    // const [requests, setRequests] = useState([]);

    // useEffect(() => {
    //     const fetchRequests = async () => {
    //         try {
    //             const response = await axios.get('/api/donation-requests'); // Replace with your API endpoint
    //             setRequests(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchRequests();
    // }, []);

    // const handleStatusChange = async (requestId, newStatus) => {
    //     try {
    //         await axios.put(`/api/donation-requests/${requestId}`, { status: newStatus });
    //         // Update the local state to reflect the changes
    //         setRequests(prevRequests => prevRequests.map(request => {
    //             if (request._id === requestId) {
    //                 return { ...request, status: newStatus };
    //             }
    //             return request;
    //         }));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">সকল রক্তদানের অনুরোধ</h1>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">নাম</th>
                        <th className="px-4 py-2">রক্তের গ্রুপ</th>
                        <th className="px-4 py-2">একক</th>
                        <th className="px-4 py-2">অবস্থান</th>
                        <th className="px-4 py-2">হাসপাতাল</th>
                        <th className="px-4 py-2">যোগাযোগ</th>
                        <th className="px-4 py-2">স্ট্যাটাস</th>
                        <th className="px-4 py-2">অ্যাকশন</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {requests.map(request => (
                        <tr key={request._id}>
                            <td className="border px-4 py-2">{request.userId && request.userId.name}</td> 
                            <td className="border px-4 py-2">{request.bloodGroup}</td>
                            <td className="border px-4 py-2">{request.units}</td>
                            <td className="border px-4 py-2">{request.location}</td>
                            <td className="border px-4 py-2">{request.hospital}</td>
                            <td className="border px-4 py-2">{request.contact}</td>
                            <td className="border px-4 py-2">
                                <span className={`
                                    ${request.status === 'pending' && 'bg-yellow-100 text-yellow-800'} 
                                    ${request.status === 'approved' && 'bg-green-100 text-green-800'} 
                                    ${request.status === 'rejected' && 'bg-red-100 text-red-800'} 
                                    ${request.status === 'completed' && 'bg-blue-100 text-blue-800'}
                                    px-2 py-1 rounded`}>
                                    {request.status}
                                </span>
                            </td>
                            <td className="border px-4 py-2">
                                <button 
                                    onClick={() => handleStatusChange(request._id, 'approved')} 
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                    অনুমোদন করুন
                                </button>
                                <button 
                                    onClick={() => handleStatusChange(request._id, 'rejected')} 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    প্রত্যাখ্যান করুন
                                </button>
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );
};

export default AllDonationRequest;
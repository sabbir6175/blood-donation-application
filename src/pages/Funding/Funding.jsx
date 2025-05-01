import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// import Loading from "./Loading";

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data } = useQuery({
    queryKey: ["funds", currentPage],
    queryFn: async () => {
      const res = await axiosSecure(
        `/funds?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const funds = data?.funds || [];
  const totalContributions = data?.totalContributions || 0;
  const totalPages = Math.ceil(totalContributions / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//  console.log(funds)
  return (
    <div className="container mx-auto my-32">
           
            <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
               <div className="text-center mb-10">
                  <h1 className="font-bold text-2xl md:text-3xl  mb-3 ">Funding</h1>
                  <span className="text-base font-normal  text-center opacity-70">We need funding for our blood donation project to ensure timely access to blood in emergencies. <br /> Your contribution can play a vital role in saving lives.</span>
               </div>
                <div className="text-right">
                  <Link
                  to={"/give-fund"}
                  >
                     <button  className="btn bg-green-500 border-none text-white hover:bg-green-500 text-sm uppercase px-7">Give Fund</button>
                  </Link>
                   
                </div>

                <div className="overflow-x-scroll lg:overflow-hidden mt-5">
                <table className="table-auto min-w-full border-collapse border border-green-400">
                    <thead>
                        <tr className="bg-gradient-to-r from-red-200 to-green-100  ">
                            <th className={`px-4 py-2`}>Name</th>
                            <th className={`px-4 py-2`}>Fund Amount</th>
                            <th className={`px-4 py-2`}>TransactionId</th>
                            <th className={`px-4 py-2`}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funds.map((fund) => (
                            <tr key={fund._id} className="border border-green-400 font-nunito font-semibold">
                                <td className={`px-4 py-2 text-center`}>{fund.name}</td>
                                <td className={`px-4 py-2 text-center`}>${fund.fundAmount}</td>
                                <td className={`px-4 py-2 text-center`}>{fund.transactionId}</td>
                                <td className={`px-4 py-2 text-center`}>{new Date(fund.fundingDate).toLocaleString('en-Gb').slice(0, 10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {pages.length > 0 ? (
                    <div className="mt-20 flex justify-center space-x-2">
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 border rounded transition text-base ${currentPage === page ? "bg-green-400 text-white font-medium" : "bg-font_tertiary hover:bg-green-400 hover:text-white"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No Pages Available</p>
                )}
            </div>

            </div>
        </div>
  );
};

export default FundingPage;

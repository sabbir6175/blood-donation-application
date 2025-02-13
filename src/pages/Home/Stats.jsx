import { FaHeartbeat, FaUserMd, FaUsers, FaAward } from "react-icons/fa";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once when visible
    threshold: 0.3,    // Trigger when 30% visible
  });

  const stats = [
    { icon: <FaHeartbeat className="text-gray-500 text-3xl" />, number: 2578, label: "SUCCESS SMILE" },
    { icon: <FaUserMd className="text-gray-500 text-3xl" />, number: 3235, label: "HAPPY DONORS" },
    { icon: <FaUsers className="text-gray-500 text-3xl" />, number: 3568, label: "HAPPY RECIPIENT" },
    { icon: <FaAward className="text-gray-500 text-3xl" />, number: 1364, label: "TOTAL AWARDS" },
  ];

  return (
    <>
    <div className="my-10">
      <h1 className="text-2xl md:text-4xl text-[#000000] font-bold text-center ">!--Successfully--!</h1>
      <img
        className="w-82 mx-auto"
        src="https://i.ibb.co.com/RkDvFz6n/separator.webp"
        alt=""
      />
    </div>
    <div ref={ref} className="h-[500px] bg-cover py-10 px-4 bg-opacity-100 flex items-center justify-center" style={{ backgroundImage: "url('https://i.ibb.co.com/d0yq9w2Y/testimony-feat-bg.webp')" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  items-center justify-center">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-2 ">{stat.icon}</div>
            {inView ? (
              <h2 className="text-3xl text-red-500 font-bold">
                <CountUp start={0} end={stat.number} duration={4.5} separator="," />
              </h2>
            ) : (
              <h2 className="text-3xl text-red-500 font-bold">0</h2>
            )}
            <p className="text-black font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default Stats;

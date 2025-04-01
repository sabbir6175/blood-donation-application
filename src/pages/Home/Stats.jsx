import { FaHeartbeat, FaUserMd, FaUsers, FaAward } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once when visible
    threshold: 0.3, // Trigger when 30% visible
  });

  const stats = [
    {
      icon: <FaHeartbeat className="text-gray-500 text-3xl" />,
      number: 2578,
      label: "SUCCESS SMILE",
    },
    {
      icon: <FaUserMd className="text-gray-500 text-3xl" />,
      number: 3235,
      label: "HAPPY DONORS",
    },
    {
      icon: <FaUsers className="text-gray-500 text-3xl" />,
      number: 3568,
      label: "HAPPY RECIPIENT",
    },
    {
      icon: <FaAward className="text-gray-500 text-3xl" />,
      number: 1364,
      label: "TOTAL AWARDS",
    },
  ];

  return (
    <>
      <div className="my-16">
        <h1 className="text-2xl md:text-4xl uppercase text-[#000000] font-bold text-center ">
          Successfully
        </h1>
        <img
          className="w-82 mx-auto"
          src="https://i.ibb.co.com/RkDvFz6n/separator.webp"
          alt=""
        />
        <span className="text-center flex justify-center md:max-w-3xl px-10 mx-auto">Successful blood donation saves lives by providing essential blood to those in need. It's a simple, safe process that makes a lasting impact.</span>
      </div>
      <div ref={ref} className=" px-4 bg-opacity-100 flex items-center justify-center">
       
        <div className="relative h-[1000px] md:h-[700px] w-full">
          
          <img
            className="h-full w-full object-cover"
            src="https://i.ibb.co.com/0V6p4B7j/testimony-feat-bg.png"
            alt=""
          />
          {/* Cards Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl  items-center justify-center w-full px-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  {inView ? (
                    <h2 className="text-3xl text-green-500 font-bold">
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
        </div>
      </div>
    </>
  );
};

export default Stats;

import { toast } from "react-toastify";

const Step = () => {
  const handleAlert = () => {
    toast.warn("details coming soon");
  };

  return (
    <div className="my-16 text-center">
      <h5 className="mb-2 text-xl font-bold text-center text-green-400 uppercase">
        What We do
      </h5>
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-bold uppercase text-center mb-2 text-[#000000]">
        our best services
      </h1>
      <div className="my-10 lg:px-20">
        {/* card 1 */}
        <div className="relative flex flex-col items-center justify-center gap-5 p-4 bg-white boxShadow rounded-xl sm:flex-row md:gap-7 lg:gap-10">
          <div className="w-full md:w-1/2 h-full md:h-[350px] lg:h-[400px]">
            <img
              src="https://i.ibb.co.com/gb3JfsR0/images-4.jpg"
              alt="image"
              className="object-fill w-full h-full bg-no-repeat bg-cover rounded-sm "
            />
          </div>

          <div className="w-full text-left md:w-1/2">
            <h1 className="mb-2 text-2xl font-bold text-gray-500 md:text-3xl lg:text-4xl">
              01
            </h1>
            <h1 className="mb-2 text-2xl font-bold md:text-3xl">
              Blood donation
            </h1>
            <span className="text-base font-normal opacity-75">
              Blood donation is the voluntary act of giving blood, typically to
              a blood bank, to be used for medical treatments or emergencies.
              The donated blood is collected, screened for diseases, and then
              stored for later use in surgeries, trauma cases, or for patients
              with blood disorders.
            </span>
            <div className="mt-3">
              <button
                onClick={handleAlert}
                className="text-black transition-all duration-300 border-transparent btn bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="relative flex flex-col items-center justify-center gap-5 p-4 mt-4 bg-white md:flex-row-reverse boxShadow rounded-xl md:gap-7 lg:gap-10">
          <div className="w-full md:w-1/2 h-full md:h-[350px] lg:h-[400px]">
            <img
              src="https://i.ibb.co.com/svTZ9LZF/download.jpg"
              alt="image"
              className="object-fill w-full h-full bg-no-repeat bg-cover rounded-sm "
            />
          </div>

          <div className="w-full text-left md:w-1/2">
            <h1 className="mb-2 text-2xl font-bold text-gray-500 md:text-3xl lg:text-4xl">
              02
            </h1>
            <h1 className="mb-2 text-2xl font-bold md:text-3xl">
              Health Check
            </h1>
            <span className="text-base font-normal opacity-75">
              A health check refers to a routine medical examination where vital
              health parameters such as blood pressure, heart rate, cholesterol
              levels, and other markers are assessed. In the context of blood
              donation, a health check is performed to ensure that the donor is
              physically fit to give blood and that it is safe for them to
              donate without compromising their health.
            </span>
            <div className="mt-3">
              <button
                onClick={handleAlert}
                className="text-black transition-all duration-300 border-transparent btn bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
        {/* card 3 */}
        <div className="relative flex flex-col items-center justify-center gap-5 p-4 mt-4 bg-white boxShadow rounded-xl sm:flex-row md:gap-7 lg:gap-10">
          <div className="w-full md:w-1/2 h-full md:h-[350px] lg:h-[400px]">
            <img
              src="https://i.ibb.co.com/V0DDbWnQ/images-2.jpg"
              alt="image"
              className="object-fill w-full h-full bg-no-repeat bg-cover rounded-sm "
            />
          </div>

          <div className="w-full text-left md:w-1/2">
            <h1 className="mb-2 text-2xl font-bold text-gray-500 md:text-3xl lg:text-4xl">
              03
            </h1>
            <h1 className="mb-2 text-2xl font-bold md:text-3xl">Blood Bank</h1>
            <span className="text-base font-normal opacity-75">
              A blood bank is a facility that collects, tests, processes, and
              stores blood and its components. Blood banks are responsible for
              maintaining a sufficient supply of blood for patients in need, and
              they also ensure that blood is safe through rigorous screening for
              infections and diseases. Blood banks play a vital role in
              emergency care, surgeries, and treatment of conditions like anemia
              or cancer.
            </span>
            <div className="mt-3">
              <button
                onClick={handleAlert}
                className="text-black transition-all duration-300 border-transparent btn bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step;

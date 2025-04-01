const Step = () => {
  return (
    <div className="my-16 text-center">
      <h5 className="text-xl font-bold uppercase text-center mb-2 text-green-400">
        What We do
      </h5>
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-bold uppercase text-center mb-2 text-[#000000]">
        our best services
      </h1>
      <div className=" my-10  lg:px-20">
        {/* card 1 */}
        <div className=" relative bg-white boxShadow rounded-xl flex sm:flex-row flex-col gap-5 md:gap-7 lg:gap-10 justify-center items-center  p-4">
          <div className="w-full md:w-1/2 h-full md:h-[350px] lg:h-[400px]">
            <img
              src="https://innovativeartisan.com/demo/html/blad-ai/assets/images/s1.jpg"
              alt="image"
              className="  h-full  object-fill bg-cover rounded-sm bg-no-repeat w-full"
            />
          </div>

          <div className="w-full md:w-1/2 text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-500 mb-2 font-bold">
              01
            </h1>
            <h1 className="text-2xl md:text-3xl  mb-2 font-bold">
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
              <button className="btn bg-gradient-to-r from-red-200 to-green-100 border-transparent text-black hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300">
                Read More
              </button>
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="mt-4 relative flex flex-col md:flex-row-reverse bg-white boxShadow rounded-xl    gap-5 md:gap-7 lg:gap-10 justify-center items-center  p-4">
          <div className="w-full md:w-1/2 h-full md:h-[350px] lg:h-[400px]">
            <img
              src="https://innovativeartisan.com/demo/html/blad-ai/assets/images/s2.jpg"
              alt="image"
              className="  h-full  object-fill bg-cover rounded-sm bg-no-repeat w-full"
            />
          </div>

          <div className="w-full md:w-1/2 text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-500 mb-2 font-bold">
              02
            </h1>
            <h1 className="text-2xl md:text-3xl  mb-2 font-bold">
              Health Check
            </h1>
            <span className="text-base font-normal opacity-75">
            A health check refers to a routine medical examination where vital health parameters such as blood pressure, heart rate, cholesterol levels, and other markers are assessed. In the context of blood donation, a health check is performed to ensure that the donor is physically fit to give blood and that it is safe for them to donate without compromising their health.
            </span>
            <div className="mt-3">
              <button className="btn bg-gradient-to-r from-red-200 to-green-100 border-transparent text-black hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300">
                Read More
              </button>
            </div>
          </div>
        </div>
        {/* card 3 */}
        <div className="mt-4 relative bg-white boxShadow rounded-xl flex sm:flex-row flex-col gap-5 md:gap-7 lg:gap-10 justify-center items-center  p-4">
          <div className="w-full md:w-1/2 h-full md:h-[350px] lg:h-[400px]">
            <img
              src="https://innovativeartisan.com/demo/html/blad-ai/assets/images/s3.jpg"
              alt="image"
              className="  h-full  object-fill bg-cover rounded-sm bg-no-repeat w-full"
            />
          </div>

          <div className="w-full md:w-1/2 text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-500 mb-2 font-bold">
              03
            </h1>
            <h1 className="text-2xl md:text-3xl  mb-2 font-bold">
            Blood Bank
            </h1>
            <span className="text-base font-normal opacity-75">
            A blood bank is a facility that collects, tests, processes, and stores blood and its components. Blood banks are responsible for maintaining a sufficient supply of blood for patients in need, and they also ensure that blood is safe through rigorous screening for infections and diseases. Blood banks play a vital role in emergency care, surgeries, and treatment of conditions like anemia or cancer.
            </span>
            <div className="mt-3">
              <button className="btn bg-gradient-to-r from-red-200 to-green-100 border-transparent text-black hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300">
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

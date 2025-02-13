const Process = () => {
  return (
    <div className="my-10 text-center">
      <h1 className="text-2xl md:text-4xl font-bold uppercase text-center mb-2 text-[#000000]">
        Donation Process
      </h1>
      <img
        className="w-82 mx-auto"
        src="https://i.ibb.co.com/RkDvFz6n/separator.webp"
        alt=""
      />
      <p className="text-base font-normal">
        The donation process from the time you arrive center until the time you
        leave
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto mt-10 px-3">
        <div className="card bg-base-100  shadow">
          <figure className="relative">
            <img
              src="https://i.ibb.co.com/V0DDbWnQ/images-2.jpg"
              alt="Shoes"
              className="w-full"
            />
            <div className="w-20 absolute bottom-0 rounded-l-md  flex justify-center items-center text-white font-bold right-0 h-12 bg-red-500">
                    1
            </div>
          </figure>
          <div className="card-body text-left">
            <h2 className=" text-left text-[#000000] font-bold text-2xl">Registration!</h2>
            <p className="text-[#000000] font-normal text-base">You need to complete a very simple registration form. Which contains all required contact information to enter in the donation process.</p>
            
          </div>
        </div>
        {/* card 2 */}
        <div className="card bg-base-100  shadow">
          <figure className="relative">
            <img
              src="https://i.ibb.co.com/svTZ9LZF/download.jpg"
              alt="Shoes"
              className="w-full"
            />
            <div className="w-20 absolute bottom-0 rounded-l-md  flex justify-center items-center text-white font-bold right-0 h-12 bg-red-500">
                    2
            </div>
          </figure>
          <div className="card-body text-left">
            <h2 className=" text-left text-[#000000] font-bold text-2xl">Screening!</h2>
            <p className="text-[#000000] font-normal text-base">A drop of blood from your finger will take for simple test to ensure that your blood iron levels are proper enough for donation process.</p>
            
          </div>
        </div>
        {/* card 3 */}
        <div className="card bg-base-100  shadow">
          <figure className="relative">
            <img
              src="https://i.ibb.co.com/gb3JfsR0/images-4.jpg"
              alt="Shoes"
              className="w-full"
            />
            <div className="w-20 absolute rounded-l-md  bottom-0 flex justify-center items-center text-white font-bold right-0 h-12 bg-red-500">
                    3
            </div>
          </figure>
          <div className="card-body text-left">
            <h2 className=" text-left text-[#000000] font-bold text-2xl">Donation!</h2>
            <p className="text-[#000000] font-normal text-base">After ensuring and passed screening test successfully you will be directed to a donor bed for donation. It will take only 6-10 minutes.</p>
            
          </div>
        </div>
        {/* card 4 */}
        <div className="card bg-base-100  shadow">
          <figure className="relative">
            <img
              src="https://i.ibb.co.com/fd3CNL7c/process-4.webp"
              alt="Shoes"
              className="w-full"
            />
            <div className="w-20 absolute rounded-l-md bottom-0 flex justify-center items-center text-white font-bold right-0 h-12 bg-red-500">
                    4
            </div>
          </figure>
          <div className="card-body text-left">
            <h2 className=" text-left text-[#000000] font-bold text-2xl">Refreshment!</h2>
            <p className="text-[#000000] font-normal text-base">You can also stay in sitting room until you feel strong enough to leave our center. You will receive awesome drink from us in donation zone.</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;

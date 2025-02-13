

const Featured = () => {
    return (
      <div className="w-full py-20 text-black ">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-4xl  mb-5 text-[#000000] uppercase font-bold">Why Blood Donation Matters?</h2>
          <p className=" mb-10 max-w-3xl mx-auto font-normal text-base text-opacity-80 text-gray-500">
            Every two seconds, someone in the world needs blood. By donating blood, you can help save lives. Blood donations are essential for patients undergoing surgery, cancer treatments, or trauma care. Be a hero—donate blood today and make a difference!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            <div className="bg-green-300 text-black text-center p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Save Lives</h3>
              <p>Your blood can save up to 3 lives. Donating just once makes a huge difference in someone’s life.</p>
            </div>
  
            <div className="bg-white text-black text-center p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Easy Process</h3>
              <p>The donation process is quick and easy. It only takes 30 minutes, and you will feel great knowing you have helped.</p>
            </div>
  
            <div className="bg-red-300 text-black text-center p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Free Health Checkup</h3>
              <p>Each time you donate, you will get a free health check-up, including blood pressure and iron levels.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Featured;
  
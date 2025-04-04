// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../AuthContext/AuthContext";
const Banner = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper "
      >
        <SwiperSlide>
          <motion.div
            className="relative w-full h-[400px] md:h-[600px] "
            initial={{ opacity: 0, y: 50 }}  // Initial position and opacity
            animate={{ opacity: 1, y: 0 }}   // Final position and opacity
            transition={{ duration: 1 }}     // Duration of the animation
          >
            <img
              src="https://i.ibb.co.com/d0yq9w2Y/testimony-feat-bg.webp"
              alt="Blood Donation"
              className="w-full h-[1062px] bg-cover bg-no-repeat"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-5 md:py-16">
              <h1 className="text-sm md:text-2xl text-white">
                Donate your blood and
                <br />
                Inspires to others
              </h1>
              <div className="flex flex-col md:flex-row gap-5">
                {!user && (
                  <Link to="/SignUp">
                    <button
                      className="mt-5 rounded-2xl py-2 md:py-3 px-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 border-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300"
                      
                    >
                      Join as a donor
                    </button>
                  </Link>
                )}
                <Link to="/Search">
                  <button
                    className="mt-5 py-2 rounded-2xl md:py-3 px-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 border-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300 "
                   
                  >
                    Search Donors
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[400px] md:h-[600px]">
            <img
              src="https://i.ibb.co.com/G4YzxrKz/1stbanner.webp"
              alt="Blood Donation"
              className="w-full h-full  bg-cover bg-no-repeat "
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-5">
              <h1 className="text-sm md:text-2xl text-white">
                Blood donation is the voluntary giving <br /> of blood to help
                save lives and support medical treatments.
              </h1>
              <div className="flex flex-col md:flex-row gap-5">
                {!user && (
                  <Link to="/SignUp">
                    <button
                      className="mt-5 rounded-2xl py-2 md:py-3 px-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 border-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300"
                      
                    >
                      Join as a donor
                    </button>
                  </Link>
                )}
                <Link to="/Search">
                  <button
                    className="mt-5 py-2 rounded-2xl md:py-3 px-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 border-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300 "
                   
                  >
                    Search Donors
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[400px] md:h-[600px]">
            <img
              src="https://i.ibb.co.com/8LX676Dz/banner2webp.webp"
              alt="Blood Donation"
              className="w-full h-full  bg-cover bg-no-repeat "
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-5">
              <h1 className="text-sm md:text-2xl text-white">
                Blood donation is the voluntary giving <br /> of blood to help
                save lives and support medical treatments.
              </h1>
              <div className="flex flex-col md:flex-row gap-5">
                {!user && (
                  <Link to="/SignUp">
                    <button
                      className="mt-5 rounded-2xl py-2 md:py-3 px-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 border-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300"
                      
                    >
                      Join as a donor
                    </button>
                  </Link>
                )}
                <Link to="/Search">
                  <button
                    className="mt-5 py-2 rounded-2xl md:py-3 px-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 border-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300 "
                   
                  >
                    Search Donors
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[400px] md:h-[600px]">
            <img
              src="https://i.ibb.co.com/xqS2rX2g/blood-Banner.webp"
              alt="Blood Donation"
              className="w-full h-full  bg-cover bg-no-repeat "
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-5">
              <h1 className="text-sm md:text-2xl text-white">
                Blood donation is the voluntary giving <br /> of blood to help
                save lives and support medical treatments.
              </h1>
              <div className="flex flex-col md:flex-row gap-5">
                {!user && (
                  <Link to="/SignUp">
                    <button
                      className="mt-5 rounded-2xl py-2 md:py-3 px-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 border-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300"
                      
                    >
                      Join as a donor
                    </button>
                  </Link>
                )}
                <Link to="/Search">
                  <button
                    className="mt-5 py-2 rounded-2xl md:py-3 px-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 border-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300 "
                   
                  >
                    Search Donors
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[400px] md:h-[600px]">
            <img
              src="https://i.ibb.co.com/FLQTMM9j/DALL-E-2025-02-12-23-56-33-A-powerful-and-inspiring-digital-illustration-of-blood-donation-The-image.webp"
              alt="Blood Donation"
              className="w-full h-full  bg-cover bg-no-repeat "
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-5">
              <h1 className="text-sm md:text-2xl text-white">
                Blood donation is the voluntary giving <br /> of blood to help
                save lives and support medical treatments.
              </h1>
              <div className="flex flex-col md:flex-row gap-5">
                {!user && (
                  <Link to="/SignUp">
                    <button
                      className="mt-5 rounded-2xl py-2 md:py-3 px-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 border-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300"
                      
                    >
                      Join as a donor
                    </button>
                  </Link>
                )}
                <Link to="/Search">
                  <button
                    className="mt-5 py-2 rounded-2xl md:py-3 px-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 border-transparent hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 transition-all duration-300 "
                   
                  >
                    Search Donors
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
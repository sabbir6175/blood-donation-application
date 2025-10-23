// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
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
            initial={{ opacity: 0, y: 50 }} // Initial position and opacity
            animate={{ opacity: 1, y: 0 }} // Final position and opacity
            transition={{ duration: 1 }} // Duration of the animation
          >
            <img
              src="https://i.ibb.co.com/d0yq9w2Y/testimony-feat-bg.webp"
              alt="Blood Donation"
              className="w-full h-[1062px] bg-cover bg-no-repeat"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center bg-black bg-opacity-50 md:py-16">
              <h1 className="text-sm text-white md:text-2xl">
                Donate your blood and
                <br />
                Inspires to others
              </h1>
              <div className="flex flex-col gap-5 md:flex-row">
                {!user && (
                  <Link to="/SignUp">
                    <button className="px-3 py-2 mt-5 transition-all duration-300 border-transparent rounded-2xl md:py-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200">
                      Join as a donor
                    </button>
                  </Link>
                )}
                <Link to="/Search">
                  <button className="px-3 py-2 mt-5 transition-all duration-300 border-transparent rounded-2xl md:py-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 ">
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
              src="https://i.ibb.co.com/gb3JfsR0/images-4.jpg"
              alt="Blood Donation"
              className="w-full h-full bg-no-repeat bg-cover "
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center bg-black bg-opacity-50">
              <h1 className="text-sm text-white md:text-2xl">
                Blood donation is the voluntary giving <br /> of blood to help
                save lives and support medical treatments.
              </h1>
              <div className="flex flex-col gap-5 md:flex-row">
                {!user && (
                  <Link to="/SignUp">
                    <button className="px-3 py-2 mt-5 transition-all duration-300 border-transparent rounded-2xl md:py-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200">
                      Join as a donor
                    </button>
                  </Link>
                )}
                <Link to="/Search">
                  <button className="px-3 py-2 mt-5 transition-all duration-300 border-transparent rounded-2xl md:py-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 ">
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
              src="https://i.ibb.co.com/SwsdtJ69/gallery-1.webp"
              alt="Blood Donation"
              className="w-full h-full bg-no-repeat bg-cover "
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center bg-black bg-opacity-50">
              <h1 className="text-sm text-white md:text-2xl">
                Blood donation is the voluntary giving <br /> of blood to help
                save lives and support medical treatments.
              </h1>
              <div className="flex flex-col gap-5 md:flex-row">
                {!user && (
                  <Link to="/SignUp">
                    <button className="px-3 py-2 mt-5 transition-all duration-300 border-transparent rounded-2xl md:py-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200">
                      Join as a donor
                    </button>
                  </Link>
                )}
                <Link to="/Search">
                  <button className="px-3 py-2 mt-5 transition-all duration-300 border-transparent rounded-2xl md:py-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 ">
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
              src="https://i.ibb.co.com/TBn9xpb8/gallery-4.webp"
              alt="Blood Donation"
              className="w-full h-full bg-no-repeat bg-cover "
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center bg-black bg-opacity-50">
              <h1 className="text-sm text-white md:text-2xl">
                Blood donation is the voluntary giving <br /> of blood to help
                save lives and support medical treatments.
              </h1>
              <div className="flex flex-col gap-5 md:flex-row">
                {!user && (
                  <Link to="/SignUp">
                    <button className="px-3 py-2 mt-5 transition-all duration-300 border-transparent rounded-2xl md:py-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200">
                      Join as a donor
                    </button>
                  </Link>
                )}
                <Link to="/Search">
                  <button className="px-3 py-2 mt-5 transition-all duration-300 border-transparent rounded-2xl md:py-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 ">
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
              src="https://i.ibb.co.com/DH3md3N0/gallery-2.webp"
              alt="Blood Donation"
              className="w-full h-full bg-no-repeat bg-cover "
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center bg-black bg-opacity-50">
              <h1 className="text-sm text-white md:text-2xl">
                Blood donation is the voluntary giving <br /> of blood to help
                save lives and support medical treatments.
              </h1>
              <div className="flex flex-col gap-5 md:flex-row">
                {!user && (
                  <Link to="/SignUp">
                    <button className="px-3 py-2 mt-5 transition-all duration-300 border-transparent rounded-2xl md:py-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200">
                      Join as a donor
                    </button>
                  </Link>
                )}
                <Link to="/Search">
                  <button className="px-3 py-2 mt-5 transition-all duration-300 border-transparent rounded-2xl md:py-3 md:px-8 bg-gradient-to-r from-red-200 to-green-100 hover:bg-gradient-to-r hover:from-green-100 hover:to-red-200 ">
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

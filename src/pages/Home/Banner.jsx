import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Correct import for swiper styles

const Banner = () => {
  return (
    <div className="w-full h-screen bg-gray-200">
      <Swiper
        spaceBetween={50} // space between slides
        slidesPerView={1} // Show 1 slide at a time
        loop={true} // Enable infinite looping
        className="h-full"
      >
        {/* Slide 1: Join as a Donor */}
        <SwiperSlide
          className="relative h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://i.ibb.co.com/GQRmdbG/banner-with-red-blood-cellis-vector-41517953.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white text-center">
              Join as a Donor
            </h1>
            <div className="flex gap-5">
              <Link to="/SignUp">
                <button className="mt-5 py-3 px-8 bg-red-600 text-white rounded-full hover:bg-white hover:text-red-500">
                  Join as a donor
                </button>
              </Link>
              <Link to="/Search">
                <button className="mt-5 py-3 px-8 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  Search Donors
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Search Donors */}
        <SwiperSlide
          className="relative h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://i.ibb.co.com/GQRmdbG/banner-with-red-blood-cellis-vector-41517953.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white text-center">
              Search Donors
            </h1>
            <Link to="/SignUp">
                <button className="mt-5 py-3 px-8 bg-red-500 text-white rounded-full hover:bg-green-600">
                  Join as a donor
                </button>
              </Link>
            <Link to="/Search">
              <button className="mt-5 py-3 px-8 bg-slate-900 text-white rounded-full hover:bg-blue-600">
              Search Donors
              </button>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

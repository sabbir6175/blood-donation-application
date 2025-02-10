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
          style={{ backgroundImage: "url('https://i.ibb.co.com/MyHzyt7r/donate-blood.webp')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center">
            <h1 className="text-2xl  text-slate-400 text-center">
            Blood donation is the voluntary giving <br /> of blood to help save lives and support medical treatments.
            </h1>
            <div className="flex gap-5">
              <Link to="/SignUp">
                <button className="mt-5 py-2 md:py-3 animate-bounce px-3 md:px-8 bg-red-600 text-white rounded-full hover:bg-white hover:text-red-500">
                  Join as a donor
                </button>
              </Link>
              <Link to="/Search">
                <button className="mt-5 -inset-90 animate-bounce  py-2 md:py-3 px-3 md:px-8 bg-white text-red-500 rounded-full hover:bg-red-600 hover:text-white">
                  Search Donors
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

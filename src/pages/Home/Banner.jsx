// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
const Banner = () => {
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
        className="mySwiper"
      >
        <SwiperSlide className="">
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
                <Link to="/SignUp">
                  <button className="mt-5 py-2 md:py-3 px-3 md:px-8 bg-red-600 text-white rounded-full hover:bg-white hover:text-red-500">
                    Join as a donor
                  </button>
                </Link>
                <Link to="/Search">
                  <button className="mt-5 py-2 md:py-3 px-3 md:px-8 bg-white text-red-500 rounded-full hover:bg-red-600 hover:text-white">
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
              src="https://i.ibb.co.com/84mbRDQn/DALL-E-2025-02-12-23-59-22-A-high-definition-digital-illustration-for-a-blood-donation-blog-banner-T.webp"
              alt="Blood Donation"
              className="w-full h-full  bg-cover bg-no-repeat "
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-5">
              <h1 className="text-sm md:text-2xl text-white">
                Blood donation is the voluntary giving <br /> of blood to help
                save lives and support medical treatments.
              </h1>
              <div className="flex flex-col md:flex-row gap-5">
                <Link to="/SignUp">
                  <button className="mt-5 py-2 md:py-3 px-3 md:px-8 bg-red-600 text-white rounded-full hover:bg-white hover:text-red-500">
                    Join as a donor
                  </button>
                </Link>
                <Link to="/Search">
                  <button className="mt-5 py-2 md:py-3 px-3 md:px-8 bg-white text-red-500 rounded-full hover:bg-red-600 hover:text-white">
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
                <Link to="/SignUp">
                  <button className="mt-5 py-2 md:py-3 px-3 md:px-8 bg-red-600 text-white rounded-full hover:bg-white hover:text-red-500">
                    Join as a donor
                  </button>
                </Link>
                <Link to="/Search">
                  <button className="mt-5 py-2 md:py-3 px-3 md:px-8 bg-white text-red-500 rounded-full hover:bg-red-600 hover:text-white">
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
                <Link to="/SignUp">
                  <button className="mt-5 py-2 md:py-3 px-3 md:px-8 bg-red-600 text-white rounded-full hover:bg-white hover:text-red-500">
                    Join as a donor
                  </button>
                </Link>
                <Link to="/Search">
                  <button className="mt-5 py-2 md:py-3 px-3 md:px-8 bg-white text-red-500 rounded-full hover:bg-red-600 hover:text-white">
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
                <Link to="/SignUp">
                  <button className="mt-5 py-2 md:py-3 px-3 md:px-8 bg-red-600 text-white rounded-full hover:bg-white hover:text-red-500">
                    Join as a donor
                  </button>
                </Link>
                <Link to="/Search">
                  <button className="mt-5 py-2 md:py-3 px-3 md:px-8 bg-white text-red-500 rounded-full hover:bg-red-600 hover:text-white">
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
{
  /* <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col items-center justify-center">
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
</div> */
}

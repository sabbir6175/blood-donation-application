// react icons
import { FaDribbble } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";

const Member = () => {
  return (
    <div className="my-16">
      <div className="">
        <h2 className="text-2xl md:text-4xl lg:text-4xl uppercase font-bold text-center text-[#000000]">
          Our Volunteers
        </h2>
        <img
          className="mx-auto w-82"
          src="https://i.ibb.co.com/RkDvFz6n/separator.webp"
          alt=""
        />

        <span className="flex justify-center px-10 mx-auto text-center md:max-w-3xl">
          The volunteers who give their time and talents help to fulfill our
          mission.
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 px-10 mt-20 md:grid-cols-2 lg:grid-cols-3 lg:px-20">
        <div className="relative w-full overflow-hidden rounded-md shadow group">
          {/*  image  */}
          <img
            src="https://i.ibb.co.com/V0hV2Zgy/team-6.webp"
            alt="animated_cards"
            className="object-fill w-full bg-cover"
          />

          {/*  texts  */}
          <div className="flex flex-col items-center justify-center backdrop-blur-md text-black absolute bottom-0 w-full pt-[15px] pb-[30px] translate-y-[200px] group-hover:translate-y-0 transition-all duration-[400ms] overflow-hidden">
            <h3 className="text-[1.7rem] translate-y-[-50px] group-hover:translate-y-0 transition-all duration-700 font-bold tracking-[5px] leading-[30px] opacity-0 group-hover:opacity-100">
              Nora Khaypeia
            </h3>
            <p className="text-[1rem] translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
              Manager
            </p>

            {/*  socials icons  */}
            <div className="flex items-center gap-[20px] mt-[15px]">
              <div className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                <ImFacebook2 className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200" />
              </div>
              <div className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[800ms] opacity-0 group-hover:opacity-100">
                <FaXTwitter className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200" />
              </div>
              <div className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[1100ms] opacity-0 group-hover:opacity-100">
                <FaDribbble className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200" />
              </div>
            </div>
          </div>
        </div>
        {/* card 2 */}
        <div className="relative w-full overflow-hidden rounded-md shadow group">
          {/*  image  */}
          <img
            src="https://i.ibb.co.com/tMKdb2yG/team-9.webp"
            alt="animated_cards"
            className="object-fill w-full bg-cover"
          />

          {/*  texts  */}
          <div className="flex flex-col items-center justify-center backdrop-blur-md text-black absolute bottom-0 w-full pt-[15px] pb-[30px] translate-y-[200px] group-hover:translate-y-0 transition-all duration-[400ms] overflow-hidden">
            <h3 className="text-[1.7rem] translate-y-[-50px] group-hover:translate-y-0 transition-all duration-700 font-bold tracking-[5px] leading-[30px] opacity-0 group-hover:opacity-100">
              Alex Joshan Deo
            </h3>
            <p className="text-[1rem] translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
              Founder
            </p>

            {/*  socials icons  */}
            <div className="flex items-center gap-[20px] mt-[15px]">
              <div className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                <ImFacebook2 className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200" />
              </div>
              <div className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[800ms] opacity-0 group-hover:opacity-100">
                <FaXTwitter className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200" />
              </div>
              <div className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[1100ms] opacity-0 group-hover:opacity-100">
                <FaDribbble className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200" />
              </div>
            </div>
          </div>
        </div>
        {/* card 3 */}
        <div className="relative w-full overflow-hidden rounded-md shadow group">
          {/*  image  */}
          <img
            src="https://i.ibb.co.com/77Q5fKw/team-7.webp"
            alt="animated_cards"
            className="object-fill w-full bg-cover"
          />

          {/*  texts  */}
          <div className="flex flex-col items-center justify-center backdrop-blur-md text-black absolute bottom-0 w-full pt-[15px] pb-[30px] translate-y-[200px] group-hover:translate-y-0 transition-all duration-[400ms] overflow-hidden">
            <h3 className="text-[1.7rem] translate-y-[-50px] group-hover:translate-y-0 transition-all duration-700 font-bold tracking-[5px] leading-[30px] opacity-0 group-hover:opacity-100">
              Joshan Khaypeia
            </h3>
            <p className="text-[1rem] translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
              Co-Founder
            </p>

            {/*  socials icons  */}
            <div className="flex items-center gap-[20px] mt-[15px]">
              <div className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                <ImFacebook2 className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200" />
              </div>
              <div className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[800ms] opacity-0 group-hover:opacity-100">
                <FaXTwitter className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200" />
              </div>
              <div className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[1100ms] opacity-0 group-hover:opacity-100">
                <FaDribbble className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;

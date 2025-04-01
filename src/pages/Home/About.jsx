import React from "react";

const About = () => {
  return (
    <div className="my-20  lg:px-20">
      <div className=" relative bg-white boxShadow rounded-xl flex sm:flex-row flex-col gap-5 md:gap-7 lg:gap-10 justify-center items-center  p-4">
        <div className="w-full md:w-1/2 h-full md:h-[350px] lg:h-[300px]">
          <img
            src="https://blood-center.sites.motocms.com/res/671f4ec30e234dbaa78e9a5f/671f6586e8a69d1d9a534b82_optimized_1479_c1479x878-0x0.webp"
            alt="image"
            className="  h-full  object-fill bg-cover rounded-sm bg-no-repeat w-full"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2 font-bold">
            Who We Are?
          </h1>
          <span className="text-base font-semibold opacity-75">
            Blood Buddies is for public donation center with blood donation
            members in the changing health care system.
          </span>
          <div className="mt-3 ">
            <ui>
              <li className="text-base font-normal ml-2 md:ml-5">Specialist blood donors and clinical supervision.</li>
              <li className="text-base font-normal ml-2 md:ml-5">Increasing communication with our members.</li>
              <li className="text-base font-normal ml-2 md:ml-5">High quality assessment, diagnosis and treatment.</li>
              <li className="text-base font-normal ml-2 md:ml-5">Examine critically to ensure alignment.</li>
              <li className="text-base font-normal ml-2 md:ml-5">The extra care of a multi-disciplinary team.</li>
            </ui>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

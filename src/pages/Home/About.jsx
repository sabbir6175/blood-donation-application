import React from "react";

const About = () => {
  return (
    <div className="my-20  md:px-20">
      <div className="w-full relative bg-white boxShadow rounded-xl flex sm:flex-row flex-col gap-5 md:gap-7 lg:gap-10 justify-center items-center  p-4">
        <div className="w-full md:w-1/2 h-full lg:h-[400px]">
          <img
            src="https://img.freepik.com/free-photo/close-up-portrait-handsome-young-hipster-man-hazel-eyes-wearing-trendy-plaid-shirt-posing-near-city-cafe_291049-1495.jpg?t=st=1722616951~exp=1722620551~hmac=88c27af52ea53d69a3f15a046cd8f7fe8c8036a5c733e1e1449b78bc68aeef24&w=360"
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

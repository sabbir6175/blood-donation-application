import { CgFacebook } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-5 justify-between bg-gradient-to-r from-green-200 to-red-100  text-black  p-10">
        <div>
          <h1 className="font-bold text-black text-2xl md:text-3xl lg:text-4xl mb-5">Blood Donation</h1>

          <p className="font-normal text-base text-opacity-80 text-gray-600 mb-2">
            Blood donation is the voluntary act of giving blood to help those in
            need, <br /> often for medical treatments or emergencies. It is a
            vital way to save lives and support healthcare systems.
            <br />
            Providing reliable tech since 1992
          </p>
          {/* <p><span className="text-black text-base">Contact Now :</span> 01310101661</p>
          <p><span className="text-black text-base">Email :</span> sabbirhasannahid6175@gmail.com</p> */}
          <p> Contact Now : <span className="text-black text-base"> 01310101661</span> </p>
          <p> Email : <span className="text-black text-base">sabbirhasannahid6175@gmail.com</span> </p>
        </div>
        <div className="mt-16 text-center md:text-left">
          <ul>
            <Link to={'/'}>
              <li className="text-base font-normal  opacity-80  hover:list-disc hover:text-black mb-2 hover:underline">
                Home
              </li>
            </Link>
            <Link to={'/donationRequest'}>
              <li className="text-base   opacity-80 hover:list-disc hover:text-black mb-2 hover:underline">
                Donation-Request
              </li>
            </Link>
            <Link to={'blogs'}>
              <li className="text-base   opacity-80 hover:list-disc hover:text-black mb-2 hover:underline">
                Blogs
              </li>
            </Link>
            <Link to={'/SignUp'}>
              <li className="text-base   opacity-80 hover:list-disc hover:text-black mb-2 hover:underline">
                Join Donor
              </li>
            </Link>
            <Link to={'/funding-page'}>
              <li className="text-base   opacity-80 hover:list-disc hover:text-black hover:underline">
                Funding
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <nav>
            <h6 className="text-2xl md:text-3xl text-black font-bold  px-10 mb-10">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <Link to={"https://www.facebook.com/sabbirhasan075"}>
                {" "}
                <CgFacebook className="font-bold text-3xl bg-blue-700 text-white rounded-sm"></CgFacebook>
              </Link>

             <Link ><FcGoogle className="font-bold text-3xl"></FcGoogle></Link>
              <Link to={'https://www.linkedin.com/in/sabbir-hasan-13805728b/'}><FaLinkedin className="font-bold text-3xl text-white bg-blue-700 rounded-sm"></FaLinkedin></Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="text-center bg-green-100 py-2 ">
            <h1>Copyright@2025 design by <span className="text-xl text-green-600">Sabbir Hasan</span> </h1>
      </div>
    </div>
  );
};

export default Footer;

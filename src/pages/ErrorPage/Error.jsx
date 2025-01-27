import { Link } from "react-router-dom";

const Error = () => {

    return (
        <div style={{background: 'url("https://i.ibb.co/02DvRcV/404.jpg")', backgroundSize: "cover"}} className="boxShadow px-10 w-full lg:min-h-[600px] py-16 flex flex-col justify-center rounded-xl">

            <h1 className="text-[2rem] sm:text-[3rem] font-[600] text-white w-full lg:w-[50%]">Go Home, You’re Drunk!</h1>

            <Link to={"/"}>
                <button className="py-3 px-8 w-max rounded-full bg-[#92E3A9] hover:bg-[#4ec46f] text-white mt-5">BACK TO HOME</button>
            </Link>
        </div>
    );
};
export default Error

const ContactUs = () => {
  return (
    <div className="w-full py-20 ">
      {" "}
      {/* Setting a background color for the page */}
      <div className=" px-3 md:px-20  text-center">
        <h2 className="text-2xl md:text-4xl text-[#00000] font-bold ">
          Get in Touch
        </h2>
        <img
          className="w-82 mx-auto"
          src="https://i.ibb.co.com/RkDvFz6n/separator.webp"
          alt=""
        />
        <p className=" mb-10 max-w-2xl mx-auto font-normal text-base text-opacity-60 text-gray-600">
          Have any questions or need more information about blood donation?
          Reach out to us through the form below or give us a call.
        </p>

        {/* Contact Form */}
        <div className="bg-slate-200 border-2 bg-opacity-20 backdrop-blur-3xl md:w-10/12 md:mx-auto p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Contact Form</h3>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-md border border-gray-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-md border border-gray-300"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 rounded-md border border-gray-300"
              ></textarea>
            </div>
            <button className="py-3 px-6 bg-green-300 text-black font-bold rounded-md  ">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

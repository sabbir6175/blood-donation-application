const ContactUs = () => {
  return (
      <div className="w-full py-20 bg-gray-100"> {/* Setting a background color for the page */}
          <div className="container mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-5">Get in Touch</h2>
              <p className="text-lg mb-10 max-w-2xl mx-auto">
                  Have any questions or need more information about blood donation? Reach out to us through the form below or give us a call.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <div className="bg-white bg-opacity-70 backdrop-blur-lg p-8 rounded-xl shadow-lg">
                      <h3 className="text-2xl font-semibold mb-6">Contact Form</h3>
                      <form action="#" method="POST">
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
                          <button type="submit" className="py-3 px-6 bg-red-500 text-white rounded-md hover:bg-blue-600 transition">
                              Send Message
                          </button>
                      </form>
                  </div>
      
                  {/* Contact Number */}
                  <div className="bg-white bg-opacity-70 backdrop-blur-lg p-8 rounded-xl shadow-lg">
                      <h3 className="text-2xl font-semibold mb-6">Call Us</h3>
                      <p className="text-lg mb-6">If you prefer to talk to us directly, feel free to call:</p>
                      <p className="text-2xl font-semibold text-blue-600">+88 01310101661</p>
                      <p className="mt-4">We’re available 24/7 for any blood donation queries.</p>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ContactUs;

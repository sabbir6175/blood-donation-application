import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

// FAQ data with questions and answers related to blood donation
const FAQ = () => {
  const faqData = [
    {
      title: "What is blood donation?",
      description:
        "Blood donation is the process of voluntarily giving a portion of your blood to be used in medical treatments, surgeries, or for patients with certain health conditions.",
    },
    {
      title: "Who can donate blood?",
      description:
        "Most healthy individuals aged 17 or older (16 with parental consent in some places) and weighing at least 110 pounds can donate blood.",
    },
    {
      title: "How often can I donate blood?",
      description:
        "You can donate whole blood every 56 days (about every 8 weeks). Plasma donation can be done every 28 days, and platelet donation can be done every 7 days.",
    },
    {
      title: "What happens to my blood after donation?",
      description:
        "After donation, the blood is tested for safety, separated into components, and distributed to hospitals or clinics for patients in need.",
    },
    {
      title: "Is blood donation safe?",
      description:
        "Yes, blood donation is generally very safe. The process is done by trained professionals in sterile conditions to prevent any risk of infection.",
    },
    {
      title: "What are the benefits of donating blood?",
      description:
        "Donating blood can help save lives and may have health benefits for the donor, such as maintaining healthy iron levels.",
    },
    {
      title: "Will I feel any pain during the donation?",
      description:
        "Most people experience only a slight pinch when the needle is inserted. The donation itself is usually pain-free.",
    },
    {
      title: "Can I donate blood if I’ve had a recent vaccination or illness?",
      description:
        "It depends on the type of vaccination or illness. Generally, you should wait a certain period after receiving a vaccine or recovering from an illness.",
    },
    {
      title: "What should I do before and after donating blood?",
      description:
        "Before donating blood, eat a healthy meal and drink plenty of water. Afterward, rest for a few minutes, have some snacks, and avoid heavy exercise.",
    },
    {
      title: "Can I donate blood if I have certain medical conditions?",
      description:
        "Certain conditions may prevent blood donation. Always consult the donation center to check your eligibility.",
    },
    {
      title: "What types of blood donations are there?",
      description:
        "There are several types: whole blood donation, plasma donation, platelet donation, and double red blood cell donation.",
    },
    {
      title: "How long does the blood donation process take?",
      description:
        "The entire process typically takes about 45 minutes to 1 hour, including registration and post-donation rest.",
    },
  ];

  const [isPlusAccordion, setIsPlusAccordion] = useState(null);

  const handleAccordionClick = (index) =>
    setIsPlusAccordion((prevIndex) => (prevIndex === index ? null : index));

  return (
    <div className="flex gap-3 my-20 px-2 md:px-10 flex-col container mx-auto">
      <div className="my-20">
      <h1 className="text-2xl md:text-4xl font-bold uppercase text-center mb-2 text-[#000000]">
        FAQ Question
      </h1>
      <img
        className="w-82 mx-auto"
        src="https://i.ibb.co.com/RkDvFz6n/separator.webp"
        alt=""
      />
      <p className="text-base text-center  font-normal px-10 md:px-20 lg:px-52">
      A series of commonly asked questions and concise answers that provide helpful information about blood donation, including eligibility, safety, procedures, and benefits.
      </p>
      </div>
      {faqData?.map((faqItem, index) => (
        <article
          key={index}
          className="border border-[#e5eaf2] rounded p-3"
        >
          <div
            className="flex gap-2 cursor-pointer items-center justify-between w-full"
            onClick={() => handleAccordionClick(index)}
          >
            <h2 className="text-black font-[600] text-[1.2rem]">
              {faqItem.title}
            </h2>
            <p>
              <FaPlus
                className={`text-[1.3rem] text-text transition-all duration-300 ${
                  isPlusAccordion === index && "rotate-[45deg] text-black"
                }`}
              />
            </p>
          </div>
          <div
            className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
              isPlusAccordion === index
                ? "grid-rows-[1fr] opacity-100 mt-4"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <p className="text-[#424242] text-[0.9rem] overflow-hidden">
              {faqItem.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default FAQ;

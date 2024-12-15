"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Are the projects listed on this platform free to access?",
      answer:
        "Yes, all the projects available on our platform are free to browse. You can explore the project details and use the resources without any cost.",
    },
    {
      question: "Can I submit my own final-year project?",
      answer:
        "Absolutely! We encourage students to upload their final-year projects and share them with the community. Simply go to contact, submit your project, and provide necessary details like documentation and code.",
    },
    {
      question: "Will I receive feedback on my project submissions?",
      answer:
        "Yes, upon submitting your project, other community members and experts can provide feedback. This way, you can enhance your projects with valuable suggestions.",
    },
    {
      question: "Can I collaborate on projects with others?",
      answer:
        "Yes, our platform supports collaboration! You can connect with other students and professionals to work together on final-year projects or explore collaborative project ideas.",
    },
    {
      question: "How can I search for projects on the platform?",
      answer:
        "You can use the search bar at the top of the page to find specific projects by title, category, or technology stack. You can also filter projects based on different criteria such as category and submission date.",
    },
    {
      question: "How do I get started with uploading my project?",
      answer:
        "Getting started is easy! After creating an account, you can upload your project by providing a title, description, related documents, and a link to the project repository (if available).",
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };


  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Here are answers to some of the most common questions about our project platform.
          </p>
        </div>
        <div className="mx-auto grid max-w-3xl gap-4 pt-8 md:pt-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg px-6 py-4 shadow-sm cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
              {openIndex === index && (
                <div className="pt-2">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;

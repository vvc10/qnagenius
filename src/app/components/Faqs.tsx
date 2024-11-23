import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Are the courses really free?",
      answer:
        "Yes, all courses listed in our free section are completely free of charge. You can access all the content and materials without any payment.",
    },
    {
      question: "Will I get a certificate?",
      answer:
        "Upon completion of the course, you will receive a digital certificate that you can share on your professional networks.",
    },
    {
      question: "How long do I have access to the courses?",
      answer:
        "Once enrolled, you have lifetime access to the course content. Learn at your own pace and revisit the materials whenever you need.",
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
            Find answers to common questions about our platform and courses.
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

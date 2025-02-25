import React from "react";
import johnImg from "../assets/images/case5.jpg";
import janeImg from "../assets/images/case6.jpg";
import michaelImg from "../assets/images/case3.avif";

const testimonials = [
  {
    text: "Best Service Ever! Highly recommend Mindful.",
    author: "John Doe",
    image: johnImg,
  },
  {
    text: "Mindful helped me find peace and clarity in life.",
    author: "Jane Smith",
    image: janeImg,
  },
  {
    text: "A truly life-changing experience. Thank you, Mindful!",
    author: "Riyan Christine",
    image: michaelImg,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-12 text-center bg-gray-100">
      <h2 className="text-3xl font-bold text-green-900 mb-6">
        Love We Got From Our Clients
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-green-900 hover:text-green-200 hover:scale-105"
          >
            <img
              src={testimonial.image}
              alt={testimonial.author}
              className="w-20 h-20 mx-auto rounded-full border-4 border-green-600 shadow-md"
            />
            <p className="text-lg italic mt-4">"{testimonial.text}"</p>
            <p className="mt-4 font-semibold">{testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

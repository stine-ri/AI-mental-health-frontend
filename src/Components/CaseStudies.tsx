import React from "react";
import case1 from "../assets/images/Case-Study.jpg";
import case2 from "../assets/images/serious-medical-team.jpg";
import case3 from "../assets/images/generative-ai-unveiling-path-to-well-being-doctors-patients-engage.webp";

const caseStudies = [
  {
    title: "Postwar Mental Health Advice in Hybrid Data",
    image: case1,
  },
  {
    title: "Mental Health Advice in Greater Glasgow and Clyde",
    image: case2,
  },
  {
    title: "5 Minutes With Old Age Consultant & Clinical Director",
    image: case3,
  },
];

const CaseStudies: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-green-900 mb-8">
        Case Studies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {caseStudies.map((caseItem, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
          >
            <img
              src={caseItem.image}
              alt={caseItem.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-green-900">{caseItem.title}</h3>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
              Read More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;

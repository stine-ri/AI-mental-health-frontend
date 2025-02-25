import React from "react";
import train1 from "../assets/images/survivor.jpg";
import train2 from "../assets/images/Docs.jpg";
import train3 from "../assets/images/anxiety.jpg";

const trainingResources = [
  {
    title: "Opioid Overdose Survivor: Mental Health and Suicidal Monitoring",
    image: train1,
  },
  {
    title: "Compassionate Caregivers: Expert on Childhood Experience",
    image: train2,
  },
  {
    title: "Everything You Need to Know About Anxiety & Recovery",
    image: train3,
  },
];

const TrainMind: React.FC = () => {
  return (
    <section className="py-16 bg-green-50 text-center">
      <h2 className="text-3xl font-bold text-green-900 mb-8">
        Train Your Mind With Us
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {trainingResources.map((resource, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
          >
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-green-900">{resource.title}</h3>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrainMind;

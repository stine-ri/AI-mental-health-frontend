import React from "react";
import { useNavigate } from "react-router-dom";
import anxietyImg from "../assets/images/train1.jpg";
import depressionImg from "../assets/images/train2.jpg";
import ptsdImg from "../assets/images/train3.avif";
import ocdImg from "../assets/images/train4.jpg";
import stressImg from "../assets/images/train5.jpg";
import bipolarImg from "../assets/images/train61.jpg";

const trainingData = [
  {
    id: 1,
    title: "Managing Anxiety",
    description:
      "Learn effective techniques like Cognitive Behavioral Therapy (CBT) and guided meditation to reduce anxiety symptoms.",
    image: anxietyImg,
  },
  {
    id: 2,
    title: "Overcoming Depression",
    description:
      "Our structured programs include positive psychology, exercise therapy, and interpersonal therapy for long-term recovery.",
    image: depressionImg,
  },
  {
    id: 3,
    title: "PTSD Recovery Program",
    description:
      "We use Exposure Therapy, EMDR, and resilience training to help patients heal from traumatic experiences.",
    image: ptsdImg,
  },
  {
    id: 4,
    title: "Coping with OCD",
    description:
      "Exposure and Response Prevention (ERP) and mindfulness exercises help manage compulsive behaviors effectively.",
    image: ocdImg,
  },
  {
    id: 5,
    title: "Stress Management",
    description:
      "Our training focuses on breathing exercises, relaxation techniques, and time management strategies for stress reduction.",
    image: stressImg,
  },
  {
    id: 6,
    title: "Bipolar Disorder Therapy",
    description:
      "Cognitive therapy, mood stabilization exercises, and lifestyle adjustments help maintain emotional balance.",
    image: bipolarImg,
  },
];

const BookTraining: React.FC = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/register");
  };

  return (
    <section className="py-12 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
        Book a Mental Health Training
      </h2>

      <div className="max-w-5xl mx-auto space-y-12">
        {trainingData.map((training, index) => (
          <div
            key={training.id}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            } items-center bg-white p-6 rounded-lg shadow-md space-y-4 md:space-y-0 md:space-x-6`}
          >
            <img
              src={training.image}
              alt={training.title}
              className="w-full md:w-1/2 rounded-lg shadow-lg"
            />
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-green-800">
                {training.title}
              </h3>
              <p className="text-gray-700 mt-2">{training.description}</p>
              <button
                onClick={handleBooking}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Book Training
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookTraining;

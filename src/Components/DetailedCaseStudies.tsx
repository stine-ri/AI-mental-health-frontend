import React from "react";
import case1 from "../assets/images/case1.avif";
import case2 from "../assets/images/case 2.webp";
import case3 from "../assets/images/case3.avif";
import case4 from "../assets/images/case4.avif";
import case5 from "../assets/images/case5.jpg";
import case6 from "../assets/images/case6.jpg";

const caseStudies = [
  {
    id: 1,
    image: case1,
    title: "Overcoming Anxiety: Sarah's Journey",
    description:
      "Sarah struggled with anxiety attacks that made social situations overwhelming. With cognitive behavioral therapy (CBT), breathing exercises, and gradual exposure therapy, she learned to manage her anxiety. Over time, Sarah built confidence, reconnected with friends, and regained control over her life.",
  },
  {
    id: 2,
    image: case2,
    title: "Fighting Depression: James' Recovery",
    description:
      "James faced years of deep depression that left him feeling isolated. His healing process involved therapy sessions, medication, and incorporating daily walks and journaling into his routine. Through community support and personal growth, James rediscovered joy and purpose.",
  },
  {
    id: 3,
    image: case3,
    title: "Healing from PTSD: Maria’s Transformation",
    description:
      "Maria suffered from PTSD after experiencing a traumatic event. She struggled with flashbacks and nightmares. With the help of EMDR therapy, mindfulness meditation, and supportive counseling, Maria slowly regained her sense of security and started living without fear.",
  },
  {
    id: 4,
    image: case4,
    title: "Managing Bipolar Disorder: David's Balance",
    description:
      "David’s mood swings made it difficult to maintain relationships and work stability. He found relief through a combination of medication, therapy, and structured routines. By tracking mood patterns and engaging in mindfulness practices, David achieved a balanced and fulfilling life.",
  },
  {
    id: 5,
    image: case5,
    title: "Social Anxiety Recovery: Emma’s Confidence",
    description:
      "Emma’s fear of social interactions held her back from forming friendships. She worked with a therapist to develop small social goals, practice self-affirmations, and use exposure therapy. Over time, Emma became more comfortable in group settings and found her voice.",
  },
  {
    id: 6,
    image: case6,
    title: "OCD Recovery: Michael’s New Beginning",
    description:
      "Michael’s obsessive thoughts and compulsions controlled his daily life. With Exposure and Response Prevention (ERP) therapy, he learned to resist compulsions and reframe intrusive thoughts. With time, Michael reclaimed his independence and embraced a new way of thinking.",
  },
];

const DetailsCaseStudies: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-green-900 mb-16">Case Studies</h2>

      <div className="max-w-5xl mx-auto space-y-20">
        {caseStudies.map((caseStudy, index) => (
          <div
            key={caseStudy.id}
            className={`flex flex-col md:flex-row items-center md:items-start md:gap-12 space-y-6 md:space-y-0 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full md:w-1/2 rounded-lg shadow-lg"
            />
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">{caseStudy.title}</h3>
              <p className="text-gray-700 leading-relaxed">{caseStudy.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailsCaseStudies;

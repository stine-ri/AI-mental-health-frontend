
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import psychiatristImg from "../assets/images/Doc 1.webp";
import psychologistImg from "../assets/images/Doc6.jpg";
import therapistImg from "../assets/images/Doc 3.jpg";
import counselorImg from "../assets/images/Doc 4.webp";  
import neuropsychiatristImg from "../assets/images/Doc5.avif";
import socialWorkerImg from "../assets/images/Doc 2.webp";
import fallbackImg from "../assets/images/kim2doc.webp"; 



// Therapist Type
interface Therapist {
  id: number;
  full_name: string;
  specialization: string;
  experience_years: number;
  contact_phone: string;
  availability: boolean;
  created_at: string;
  updated_at: string;
  description?: string;
  qualifications?: string;
}

// Image Mapping for Specializations
const specializationImages: Record<string, string> = {
  "Psychiatrist": psychiatristImg,
  "Psychologist": psychologistImg,
  "Therapist": therapistImg,
  "Licensed Counselor": counselorImg,
  "Neuropsychiatrist": neuropsychiatristImg,
  "Clinical Social Worker": socialWorkerImg,
};

// Default Data for Specializations
const defaultData: Record<string, { description: string; qualifications: string; experience_years: number }> = {
  "Psychiatrist": {
    description: "Psychiatrists diagnose and treat mental illnesses with medication and psychotherapy.",
    qualifications: "MD with specialization in Psychiatry.",
    experience_years: 15,
  },
  "Psychologist": {
    description: "Psychologists provide therapy, conduct psychological assessments, and offer counseling.",
    qualifications: "PhD or Master's degree in Psychology.",
    experience_years: 12,
  },
  "Therapist": {
    description: "Therapists help individuals manage mental health challenges and improve well-being.",
    qualifications: "Master's in Counseling or Clinical Therapy.",
    experience_years: 10,
  },
  "Licensed Counselor": {
    description: "Licensed counselors provide guidance to help individuals navigate personal challenges.",
    qualifications: "Master's in Counseling or Social Work.",
    experience_years: 8,
  },
  "Neuropsychiatrist": {
    description: "Neuropsychiatrists specialize in disorders at the intersection of neurology and psychiatry.",
    qualifications: "MD in Neurology with specialization in Psychiatry.",
    experience_years: 20,
  },
  "Clinical Social Worker": {
    description: "Clinical social workers help clients manage mental health through therapy and support services.",
    qualifications: "Master's in Social Work (MSW) with clinical license.",
    experience_years: 9,
  },
  "Psychology": {
    description: "Psychologists focus on understanding human behavior and mental processes to promote well-being.",
    qualifications: "Bachelor's, Master's, or PhD in Psychology.",
    experience_years: 5,
  },
};

// Function to normalize specialization names
const normalizeSpecialization = (specialization: string) => {
  return specialization
    .toLowerCase()
    .replace(/\s+/g, " ") // Remove extra spaces
    .replace(/counsellor/gi, "counselor") // Handle spelling
    .replace(/psychiarist/gi, "psychiatrist") // Correct typos
    .trim()
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase()); // Capitalize words
};

const DoctorsList: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ai-mentalhealthplatform.onrender.com/api/therapists")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Normalize specialization names (capitalize first letter)
          const normalizedData = data.map((therapist: Therapist) => {
            const normalizedSpecialization = normalizeSpecialization(
              therapist.specialization
            );

            const fallback = defaultData[normalizedSpecialization] || {
              description: "No description provided for this specialization.",
              qualifications: "No qualifications listed.",
              experience_years: therapist.experience_years || 1,
            };

            return {
              ...therapist,
              specialization: normalizedSpecialization,
              description: therapist.description || fallback.description,
              qualifications: therapist.qualifications || fallback.qualifications,
              experience_years:
                therapist.experience_years || fallback.experience_years,
            };
          });
          setTherapists(normalizedData);
        } else {
          console.warn("No data received, using fallback data.");
          const fallbackTherapists = Object.entries(defaultData).map(
            ([specialization, details], index) => ({
              id: index + 1,
              full_name: `Dr. ${specialization} Specialist`,
              specialization,
              experience_years: details.experience_years,
              contact_phone: "N/A",
              availability: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              description: details.description,
              qualifications: details.qualifications,
            })
          );
          setTherapists(fallbackTherapists);
        }
      })
      .catch((err) => {
        console.error("Error fetching therapists:", err);
        const fallbackTherapists = Object.entries(defaultData).map(
          ([specialization, details], index) => ({
            id: index + 1,
            full_name: `Dr. ${specialization} Specialist`,
            specialization,
            experience_years: details.experience_years,
            contact_phone: "N/A",
            availability: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            description: details.description,
            qualifications: details.qualifications,
          })
        );
        setTherapists(fallbackTherapists);
      });
  }, []);

 
  // Booking handler always redirects to login
  const handleBooking = () => {
    console.log("Redirecting to /login...");
    navigate("/login"); // Always redirect to login
  };


  return (
    <section className="py-16 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-green-900 mb-16">
        Meet Our Mental Health Experts
      </h2>

      {therapists.length === 0 ? (
        <p className="text-center text-gray-500">Loading therapists...</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-20">
          {therapists.map((therapist, index) => (
            <div
              key={therapist.id}
              className={`flex flex-col md:flex-row items-center md:items-start md:gap-12 space-y-6 md:space-y-0 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <img
                src={
                  specializationImages[therapist.specialization] ||
                  fallbackImg
                }
                alt={therapist.full_name}
                className="w-full md:w-1/2 rounded-lg shadow-lg"
              />

              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold text-green-800 mb-2">
                  {therapist.full_name}
                </h3>
                <h4 className="text-lg font-medium text-green-600 mb-4">
                  {therapist.specialization}
                </h4>

                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>About:</strong> {therapist.description}
                </p>

                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>Experience:</strong> {therapist.experience_years} years
                </p>

                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>Qualifications:</strong> {therapist.qualifications}
                </p>

                <button
                  onClick={handleBooking}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorsList;

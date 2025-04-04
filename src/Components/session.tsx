// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Import images from assets
// import defaultImage from "../assets/images/johndoc.avif";
// import psychiatristImg from "../assets/images/Doc 1.webp";
// import psychologistImg from "../assets/images/Doc6.jpg";
// import therapistImg from "../assets/images/Doc 3.jpg";
// import counselorImg from "../assets/images/Doc 4.webp";
// import neuropsychiatristImg from "../assets/images/Doc5.avif";
// import socialWorkerImg from "../assets/images/Doc 2.webp";

// // Define therapist interface
// interface Therapist {
//   id: number;
//   full_name: string;
//   specialization: string;
//   experience_years: number;
//   contact_phone: string;
//   availability: boolean;
// }

// // Map specialization to the correct image
// const specializationImageMap: { [key: string]: string } = {
//   psychiarist: psychiatristImg,
//   psychologist: psychologistImg,
//   Therapist: therapistImg,
//   "Licensed Counsellor": counselorImg,
//   Neuropsychiatrist: neuropsychiatristImg,
//   "Clinical Social worker": socialWorkerImg,
// };

// const SessionBooking: React.FC = () => {
//   const [therapists, setTherapists] = useState<Therapist[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Fetch therapists from backend
//   useEffect(() => {
//     const fetchTherapists = async () => {
//       try {
//         const response = await fetch(
//           "https://ai-mentalhealthplatform.onrender.com/api/therapists"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch therapists.");
//         }
//         const data = await response.json();
//         setTherapists(data);
//       } catch (err) {
//         setError((err as Error).message || "Something went wrong.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTherapists();
//   }, []);

//   // Handle navigation to booking page
//   const handleNavigateToBooking = (therapistId: number) => {
//     navigate(`/book-session?therapistId=${therapistId}`);
//   };

//   // Get image based on specialization or fallback to default
//   const getTherapistImage = (specialization: string) => {
//     return specializationImageMap[specialization] || defaultImage;
//   };

//   if (loading) {
//     return <p className="text-center mt-10">Loading therapists...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500 mt-10">{error}</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-5">
//       <h2 className="text-2xl font-semibold text-center mb-6">
//         Book a Therapy Session
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {therapists.map((therapist) => (
//           <div
//             key={therapist.id}
//             className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white text-center"
//           >
//             <img
//               src={getTherapistImage(therapist.specialization)}
//               alt={therapist.full_name}
//               className="w-32 h-32 object-cover mx-auto rounded-full mb-3"
//             />
//             <h3 className="text-lg font-semibold">{therapist.full_name}</h3>
//             <p className="text-sm text-gray-600 mb-1">
//               {therapist.specialization}
//             </p>
//             <p className="text-sm text-gray-500 mb-3">
//               {therapist.experience_years} years of experience
//             </p>
//             <button
//               className="w-full py-2 rounded bg-green-500 hover:bg-green-600 text-white transition"
//               onClick={() => handleNavigateToBooking(therapist.id)}
//               disabled={!therapist.availability}
//             >
//               {therapist.availability ? "Book Session" : "Not Available"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SessionBooking;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import images from assets
import defaultImage from "../assets/images/johndoc.avif";
import psychiatristImg from "../assets/images/Doc 1.webp";
import psychologistImg from "../assets/images/Doc6.jpg";
import therapistImg from "../assets/images/Doc 3.jpg";
import counselorImg from "../assets/images/Doc 4.webp";
import neuropsychiatristImg from "../assets/images/Doc5.avif";
import socialWorkerImg from "../assets/images/Doc 2.webp";

// Define therapist interface with ratings
interface Therapist {
  id: number;
  full_name: string;
  specialization: string;
  experience_years: number;
  contact_phone: string;
  availability: boolean;
  rating?: number;
  total_ratings?: number;
}

// Map specialization to the correct image
const specializationImageMap: { [key: string]: string } = {
  psychiarist: psychiatristImg,
  psychologist: psychologistImg,
  Therapist: therapistImg,
  "Licensed Counsellor": counselorImg,
  Neuropsychiatrist: neuropsychiatristImg,
  "Clinical Social worker": socialWorkerImg,
};

const SessionBooking: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userRatings, setUserRatings] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();

  // Fetch therapists from backend
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await fetch(
          "https://ai-mentalhealthplatform.onrender.com/api/therapists"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch therapists.");
        }
        const data = await response.json();
        // Initialize with default ratings if not provided
        const therapistsWithRatings = data.map((therapist: Therapist) => ({
          ...therapist,
          rating: therapist.rating || 4.5, // Default rating if not provided
          total_ratings: therapist.total_ratings || 10, // Default count if not provided
        }));
        setTherapists(therapistsWithRatings);
      } catch (err) {
        setError((err as Error).message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchTherapists();
  }, []);

  // Handle navigation to booking page
  const handleNavigateToBooking = (therapistId: number) => {
    navigate(`/book-session?therapistId=${therapistId}`);
  };

  // Handle rating change
  const handleRatingChange = (therapistId: number, newRating: number) => {
    setUserRatings((prev) => ({ ...prev, [therapistId]: newRating }));
    
    // In a real app, you would send this to your backend
    // For now, we'll just update the local state
    setTherapists(prevTherapists =>
      prevTherapists.map(therapist =>
        therapist.id === therapistId
          ? {
              ...therapist,
              rating: calculateNewRating(therapist, newRating),
              total_ratings: (therapist.total_ratings || 0) + 1
            }
          : therapist
      )
    );
  };

  // Calculate new rating when user submits a rating
  const calculateNewRating = (therapist: Therapist, newRating: number) => {
    const currentTotal = (therapist.rating || 0) * (therapist.total_ratings || 0);
    const newTotal = currentTotal + newRating;
    const newTotalRatings = (therapist.total_ratings || 0) + 1;
    return parseFloat((newTotal / newTotalRatings).toFixed(1));
  };

  // Get image based on specialization or fallback to default
  const getTherapistImage = (specialization: string) => {
    return specializationImageMap[specialization] || defaultImage;
  };

  if (loading) {
    return <p className="text-center mt-10">Loading therapists...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Book a Therapy Session
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {therapists.map((therapist) => (
          <div
            key={therapist.id}
            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white text-center"
          >
            <img
              src={getTherapistImage(therapist.specialization)}
              alt={therapist.full_name}
              className="w-32 h-32 object-cover mx-auto rounded-full mb-3"
            />
            <h3 className="text-lg font-semibold">{therapist.full_name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              {therapist.specialization}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              {therapist.experience_years} years of experience
            </p>
            
            {/* Rating display */}
            <div className="flex justify-center items-center mb-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(therapist.rating || 0) ? 'text-green-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-600">
                ({therapist.rating?.toFixed(1) || '0.0'}) • {therapist.total_ratings || 0} reviews
              </span>
            </div>
            
            {/* Rating input (only shows if user hasn't rated yet) */}
            {!userRatings[therapist.id] && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Rate this therapist:</p>
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(therapist.id, star)}
                      className="text-gray-300 hover:text-green-500 focus:outline-none"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button
              className="w-full py-2 rounded bg-green-500 hover:bg-green-600 text-white transition"
              onClick={() => handleNavigateToBooking(therapist.id)}
              disabled={!therapist.availability}
            >
              {therapist.availability ? "Book Session" : "Not Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionBooking;
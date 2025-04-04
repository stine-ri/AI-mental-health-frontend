import React, { useState, useEffect } from "react";

interface Review {
  id: number;
  therapistName: string;
  author: string;
  company?: string;
  content: string;
  rating: number;
  date: string;
}

const ReviewComponent: React.FC = () => {
  interface Therapist {
    id: number;
    full_name: string;
    specialization: string;
  }

  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    author: "",
    company: "",
    content: "",
    rating: 0,
  });
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setTherapists(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching therapists:", err);
        setLoading(false);
      }
    };
    fetchTherapists();
  }, []);

  // Filter reviews for the selected therapist
  const filteredReviews = selectedTherapist
    ? reviews.filter((review) => review.therapistName === selectedTherapist)
    : [];

  // Handle review submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTherapist) return;

    const review: Review = {
      id: reviews.length + 1,
      therapistName: selectedTherapist,
      author: newReview.author,
      company: newReview.company,
      content: newReview.content,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    setReviews([...reviews, review]);
    setNewReview({
      author: "",
      company: "",
      content: "",
      rating: 0,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Client Testimonials</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Read what our clients say about their therapy experiences
        </p>
      </div>

      {/* Therapist Selection */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="relative">
          <label htmlFor="therapist-select" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by therapist
          </label>
          <select
            id="therapist-select"
            value={selectedTherapist}
            onChange={(e) => setSelectedTherapist(e.target.value)}
            className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg shadow-sm appearance-none bg-white"
          >
            <option value="">All Therapists</option>
            {therapists.map((therapist) => (
              <option key={therapist.id} value={therapist.full_name}>
                {therapist.full_name} ({therapist.specialization})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {selectedTherapist ? `${selectedTherapist}'s Reviews` : 'All Reviews'} 
              {filteredReviews.length > 0 && (
                <span className="ml-2 text-green-600">
                  ({filteredReviews.length})
                </span>
              )}
            </h3>
          </div>

          {filteredReviews.length > 0 ? (
            <div className="space-y-6">
              {(showAllReviews ? filteredReviews : filteredReviews.slice(0, 3)).map((review) => (
                <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{review.author}</h4>
                          {review.company && (
                            <p className="text-xs text-gray-500 mt-1">{review.company}</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex mt-2 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-gray-700">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {filteredReviews.length > 3 && (
                <div className="pt-4 text-center">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800"
                  >
                    {showAllReviews ? (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        Show fewer reviews
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        View all {filteredReviews.length} reviews
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {selectedTherapist 
                  ? `No reviews yet for ${selectedTherapist}`
                  : "No reviews to display"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedTherapist 
                  ? "Be the first to share your experience!"
                  : "Select a therapist to see their reviews"}
              </p>
            </div>
          )}

          {/* Add Review Form */}
          {selectedTherapist && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Share Your Experience</h3>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="author"
                      value={newReview.author}
                      onChange={(e) =>
                        setNewReview({ ...newReview, author: e.target.value })
                      }
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Organization (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={newReview.company}
                      onChange={(e) =>
                        setNewReview({ ...newReview, company: e.target.value })
                      }
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, rating: star })
                        }
                        className="focus:outline-none"
                      >
                        <svg
                          className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {newReview.rating} out of 5
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="review"
                    value={newReview.content}
                    onChange={(e) =>
                      setNewReview({ ...newReview, content: e.target.value })
                    }
                    rows={4}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="How has this therapist helped your mental health journey?"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
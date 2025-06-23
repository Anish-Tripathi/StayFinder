import React, { useState } from "react";
import {
  MessageSquare,
  Star,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";

const FeedbackPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [rating, setRating] = useState(0);
  const [emojiFeedback, setEmojiFeedback] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    contactPermission: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, contactPermission: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", { rating, emojiFeedback, formData });
    setSubmitted(true);
    // Here you would typically send the data to your backend
    setTimeout(() => setSubmitted(false), 5000);
  };

  const emojis = [
    { icon: <Frown className="w-8 h-8" />, value: "poor", label: "Poor" },
    { icon: <Meh className="w-8 h-8" />, value: "average", label: "Average" },
    { icon: <Smile className="w-8 h-8" />, value: "good", label: "Good" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gray-900">Share Your</span>{" "}
              <span className="text-blue-600">Feedback </span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We value your experience. Help us improve by sharing your
              thoughts, suggestions, or concerns.
            </p>
          </div>

          {/* Feedback Tabs */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
                    activeTab === "general"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  General Feedback
                </button>
                <button
                  onClick={() => setActiveTab("rating")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
                    activeTab === "rating"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Star className="w-4 h-4" />
                  Rate Your Experience
                </button>
                <button
                  onClick={() => setActiveTab("quick")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 ${
                    activeTab === "quick"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Quick Feedback
                </button>
              </nav>
            </div>

            <div className="p-6 md:p-8">
              {/* Success Message */}
              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">
                      Thank you for your feedback!
                    </h3>
                    <p className="text-green-700 text-sm">
                      We appreciate you taking the time to help us improve.
                    </p>
                  </div>
                </div>
              )}

              {/* General Feedback Form */}
              {activeTab === "general" && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="feedback"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Feedback
                      </label>
                      <textarea
                        id="feedback"
                        name="feedback"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="What did you like or what can we improve?"
                        value={formData.feedback}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="contactPermission"
                        name="contactPermission"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData.contactPermission}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor="contactPermission"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        I'm open to being contacted for follow-up questions
                      </label>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Rating Experience */}
              {activeTab === "rating" && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        How would you rate your overall experience?
                      </h3>
                      <div className="flex justify-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`p-2 rounded-full ${
                              rating >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            <Star className="w-8 h-8 fill-current" />
                          </button>
                        ))}
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        {rating === 0
                          ? "Select a rating"
                          : `${rating} star${rating !== 1 ? "s" : ""}`}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="ratingFeedback"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        What could we do better? (Optional)
                      </label>
                      <textarea
                        id="ratingFeedback"
                        name="feedback"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your suggestions..."
                        value={formData.feedback}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={rating === 0}
                        className={`px-6 py-3 rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          rating === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                        }`}
                      >
                        Submit Rating
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Quick Feedback */}
              {activeTab === "quick" && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        How was your experience with StayFinder?
                      </h3>
                      <div className="flex justify-center space-x-6">
                        {emojis.map((emoji) => (
                          <label
                            key={emoji.value}
                            className="flex flex-col items-center cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="emojiFeedback"
                              value={emoji.value}
                              checked={emojiFeedback === emoji.value}
                              onChange={() => setEmojiFeedback(emoji.value)}
                              className="sr-only"
                            />
                            <div
                              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                emojiFeedback === emoji.value
                                  ? "bg-blue-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              {emoji.icon}
                            </div>
                            <span className="mt-2 text-sm font-medium text-gray-700">
                              {emoji.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        What was the most important factor in your rating?
                      </h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            Ease of booking
                          </span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            Property quality
                          </span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            Customer service
                          </span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">
                            Value for money
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={!emojiFeedback}
                        className={`px-6 py-3 rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          !emojiFeedback
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                        }`}
                      >
                        Send Quick Feedback
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Alternative Feedback Methods */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Contact Us
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Send detailed feedback to our support team
                  </p>
                  <a
                    href="mailto:feedback@stayfinder.com"
                    className="text-blue-600 text-sm font-medium"
                  >
                    support@stayfinder.com
                  </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Speak directly with a customer service representative
                  </p>
                  <a
                    href="tel:+18005551234"
                    className="text-blue-600 text-sm font-medium"
                  >
                    +91-9876543210
                  </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Report an Issue
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Need immediate assistance with a problem?
                  </p>
                  <a
                    href="/support"
                    className="text-blue-600 text-sm font-medium"
                  >
                    Visit our support center
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;

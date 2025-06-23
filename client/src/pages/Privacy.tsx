import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Shield,
  Key,
  DollarSign,
  AlertTriangle,
  Search,
  Siren,
  Globe,
  Mail,
  HelpCircle,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";

const Privacy: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState<string>("protecting-account");

  const sections = [
    { id: "protecting-account", title: "Account Protection", icon: Lock },
    { id: "safe-payments", title: "Safe Payments", icon: DollarSign },
    { id: "travel-safety", title: "Travel Safety", icon: Siren },
    { id: "online-privacy", title: "Online Privacy", icon: Globe },
    { id: "need-help", title: "Need Help?", icon: HelpCircle },
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-gray-900">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gray-900">Safety &</span>{" "}
              <span className="text-blue-600">Privacy </span>
            </h1>

            <p className="text-gray-600">
              Your safety matters with every booking, stay safe every step of
              the way.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="md:w-1/4 p-4 border-r">
              <h2 className="text-lg font-semibold mb-4 px-2">Sections</h2>
              <ul className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                          activeSection === section.id
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {section.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4 p-6">
              {activeSection === "protecting-account" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold">
                      Protecting Your Account
                    </h2>
                  </div>

                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Shield className="text-blue-600 w-5 h-5" /> Use a Strong
                      Password
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>
                        Create a unique password with a mix of letters, numbers,
                        and symbols
                      </li>
                      <li>Avoid reusing passwords from other sites</li>
                      <li>
                        Enable two-factor authentication (2FA) for extra
                        security
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Key className="text-blue-600 w-5 h-5" /> Secure Your
                      Login
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Never share your login details with anyone</li>
                      <li>Log out from shared or public devices</li>
                      <li>
                        Be cautious of phishing emails pretending to be from us
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSection === "safe-payments" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold">Safe Payments</h2>
                  </div>

                  <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Lock className="text-green-600 w-5 h-5" /> Book Securely
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Only make payments through our official platform</li>
                      <li>
                        Avoid direct transactions with hosts outside the site
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="text-green-600 w-5 h-5" />{" "}
                      Beware of Scams
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Be wary of too-good-to-be-true deals</li>
                      <li>Report suspicious listings or requests</li>
                      <li>
                        Never share credit card details via email or messages
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSection === "travel-safety" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Siren className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold">
                      Staying Safe While Traveling
                    </h2>
                  </div>

                  <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Search className="text-yellow-600 w-5 h-5" /> Verify
                      Listings & Hosts
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Read reviews from previous guests</li>
                      <li>Check host profiles for verification badges</li>
                      <li>Communicate via our platform for record-keeping</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Siren className="text-yellow-600 w-5 h-5" /> Emergency
                      Preparedness
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Save local emergency numbers</li>
                      <li>Share your itinerary with a trusted contact</li>
                      <li>
                        Know the nearest exits and safety procedures at your
                        stay
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSection === "online-privacy" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold">Online Privacy</h2>
                  </div>

                  <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Globe className="text-purple-600 w-5 h-5" /> Manage Your
                      Data
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Adjust privacy settings in your account</li>
                      <li>Limit personal details in public profiles</li>
                      <li>Review app permissions on your devices</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Mail className="text-purple-600 w-5 h-5" /> Control
                      Communications
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Use our messaging system for all bookings</li>
                      <li>Block or report suspicious users</li>
                      <li>Opt out of promotional emails if preferred</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSection === "need-help" && (
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold">Need Help?</h2>
                  </div>
                  <p className="text-gray-700 mb-4">
                    If you encounter any safety concerns or privacy issues,
                    contact our support team immediately.
                  </p>
                  <Link
                    to="/feedback"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
                  >
                    Contact Support
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

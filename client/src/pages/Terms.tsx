import React, { useState } from "react";
import {
  Shield,
  FileText,
  CreditCard,
  RefreshCw,
  Users,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";

const Terms: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(
    "introduction"
  );

  const sections = [
    { id: "introduction", title: "Introduction", icon: FileText },
    { id: "acceptance", title: "Acceptance of Terms", icon: CheckCircle },
    { id: "booking", title: "Booking Policies", icon: Shield },
    { id: "payments", title: "Payment Terms", icon: CreditCard },
    { id: "cancellations", title: "Cancellations & Refunds", icon: RefreshCw },
    { id: "user-conduct", title: "User Conduct", icon: Users },
    { id: "liability", title: "Liability", icon: AlertTriangle },
    { id: "privacy", title: "Privacy", icon: Shield },
  ];

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="container mx-auto px-4 py-3">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">
                  <span className="text-gray-900">Terms &</span>{" "}
                  <span className="text-blue-600">Conditions </span>
                </h1>
                <p className="text-gray-600">Last updated: June 18, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Navigation
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {activeSection === "introduction" && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Introduction
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Welcome to StayFinder, your trusted platform for discovering
                    and booking unique accommodations worldwide. StayFinder
                    connects travelers with hosts offering a variety of lodging
                    options, from cozy apartments to luxurious villas.
                  </p>
                  <p>
                    These Terms and Conditions govern your use of our services,
                    including but not limited to browsing listings, making
                    bookings, and interacting with hosts and other users on our
                    platform. By accessing or using StayFinder, you agree to
                    comply with these terms, which form a legally binding
                    agreement between you and StayFinder.
                  </p>
                  <p>
                    We reserve the right to update these terms periodically. You
                    will be notified of significant changes via email or through
                    our platform. Continued use of StayFinder after such updates
                    constitutes your acceptance of the revised terms.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "acceptance" && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Acceptance of Terms
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p className="bg-blue-50 p-3 rounded-lg">
                    By accessing or using StayFinder’s website, mobile
                    applications, or services, you acknowledge that you have
                    read, understood, and agree to be bound by these Terms and
                    Conditions, as well as our Privacy Policy.
                  </p>
                  <p>
                    If you do not agree with any part of these terms, you must
                    immediately cease using our services. Users under 18 years
                    of age are not permitted to use StayFinder without parental
                    or guardian consent.
                  </p>
                  <p>
                    These terms apply to all users, including guests, hosts, and
                    third parties interacting with our platform. Any violation
                    of these terms may result in suspension or termination of
                    your account.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "booking" && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Booking Policies
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold mb-2">Booking Requirements</h3>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>
                        Valid government-issued ID for age and identity
                        verification.
                      </li>
                      <li>
                        Accurate guest count, including children and infants.
                      </li>
                      <li>
                        Verified payment method linked to your StayFinder
                        account.
                      </li>
                      <li>
                        Compliance with host-specific requirements, such as
                        house rules or pet policies.
                      </li>
                    </ul>
                  </div>
                  <p>
                    All bookings are subject to host confirmation and
                    availability. StayFinder acts as an intermediary to
                    facilitate bookings but does not own or operate the listed
                    properties. Guests are responsible for reviewing listing
                    details, including amenities, house rules, and cancellation
                    policies, before booking.
                  </p>
                  <p>
                    Modifications to bookings (e.g., date changes or guest count
                    adjustments) may incur additional fees and require host
                    approval. StayFinder reserves the right to cancel bookings
                    suspected of fraudulent activity.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "payments" && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Terms
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    StayFinder processes payments securely through our platform
                    using trusted third-party payment processors. We accept
                    major credit cards, debit cards, and select digital payment
                    methods, as indicated during checkout.
                  </p>
                  <p>
                    All fees, including accommodation costs, service fees,
                    cleaning fees, and applicable taxes, will be clearly
                    displayed before you confirm your booking. Guests are
                    responsible for ensuring sufficient funds are available for
                    payment at the time of booking.
                  </p>
                  <p>
                    In some cases, hosts may require a deposit or
                    pre-authorization, which will be refunded according to the
                    host’s policies. StayFinder is not responsible for currency
                    conversion fees or additional charges imposed by your
                    financial institution.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "cancellations" && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <RefreshCw className="w-5 h-5 text-orange-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Cancellations & Refunds
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Cancellation policies are set by individual hosts and vary
                    by property. These policies (e.g., flexible, moderate, or
                    strict) are clearly displayed on the listing page and during
                    the booking process.
                  </p>
                  <p>
                    StayFinder’s service fees are generally non-refundable,
                    except in cases where the host initiates the cancellation or
                    if the booking is canceled within 24 hours of confirmation
                    (subject to conditions). Refunds for accommodation costs are
                    processed according to the host’s cancellation policy.
                  </p>
                  <p>
                    In the event of extenuating circumstances (e.g., natural
                    disasters or government travel restrictions), StayFinder may
                    offer additional refund options at our discretion. Guests
                    must submit refund requests through our platform for review.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "user-conduct" && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    User Conduct
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">
                      Prohibited Activities
                    </h3>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>
                        Fraudulent activity, including misrepresentation of
                        identity or payment information.
                      </li>
                      <li>Property damage or theft during your stay.</li>
                      <li>
                        Unauthorized parties or events at the booked
                        accommodation.
                      </li>
                      <li>
                        Harassment, discrimination, or inappropriate behavior
                        toward hosts, guests, or StayFinder staff.
                      </li>
                      <li>
                        Using the platform for illegal purposes or violating
                        local laws.
                      </li>
                    </ul>
                  </div>
                  <p>
                    Users must comply with all house rules set by hosts,
                    including restrictions on smoking, pets, or noise levels.
                    Violations of these terms or host rules may result in
                    account suspension, termination, or additional charges for
                    damages.
                  </p>
                  <p>
                    StayFinder encourages respectful and responsible behavior to
                    foster a safe and welcoming community for all users.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "liability" && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-900">Liability</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    StayFinder operates as a platform connecting hosts and
                    guests and does not own, manage, or control the properties
                    listed on our site. We are not liable for any damages,
                    losses, or injuries arising from your use of our services or
                    stays at booked accommodations.
                  </p>
                  <p>
                    Guests and hosts are strongly encouraged to obtain
                    appropriate insurance coverage, such as travel insurance or
                    property insurance, to protect against unforeseen events,
                    including cancellations, damages, or personal injury.
                  </p>
                  <p>
                    StayFinder is not responsible for disputes between hosts and
                    guests, including issues related to property conditions,
                    misrepresentation, or failure to meet expectations. However,
                    we provide tools to report issues and facilitate
                    communication.
                  </p>
                </div>
              </div>
            )}

            {activeSection === "privacy" && (
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Privacy</h2>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    We are committed to protecting your personal information in
                    accordance with our Privacy Policy, which outlines how we
                    collect, use, and safeguard your data. Personal information
                    is shared only as necessary to facilitate bookings, process
                    payments, or comply with legal obligations.
                  </p>
                  <p>
                    StayFinder employs industry-standard security measures, such
                    as encryption and secure servers, to protect your data.
                    However, you are responsible for maintaining the
                    confidentiality of your account credentials and ensuring
                    secure access to your devices.
                  </p>
                  <p>
                    By using our platform, you consent to the collection and use
                    of your data as described in our Privacy Policy. You may
                    manage your privacy settings through your account dashboard
                    or contact us for assistance.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-3">Questions?</h3>
              <p className="text-gray-600">
                If you have any questions or concerns about these Terms and
                Conditions, please contact us at{" "}
                <a
                  href="mailto:support@stayfinder.com"
                  className="text-blue-600 hover:underline"
                >
                  support@stayfinder.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

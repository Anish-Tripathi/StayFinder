import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  HeartIcon,
  GlobeIcon,
  ZapIcon,
  MapPinIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { mainBenefits, features, steps, stats, faqs } from "../utils/about";

const BecomeHost = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleCTA = () => {
    logout();
    navigate("/home");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
              <ZapIcon className="w-4 h-4 mr-2" />
              India's Premier Hosting Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-gray-900 dark:text-gray-100">
                Turn Your
              </span>{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Space Into Income
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join over 50,000 hosts across 500+ Indian cities, earning
              ₹15,000-₹50,000 monthly by sharing their spaces. Start your
              hosting journey with StayFinder and unlock a world of
              opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handleCTA}
                className="group relative px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center">
                  Start Earning Now
                  <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <CheckCircleIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                <span>Free to List • Zero Setup Fees</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Why <span className="text-blue-600 dark:text-blue-400">Host</span>{" "}
            with StayFinder?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From supplemental income to cultural connections, hosting with
            StayFinder offers unmatched benefits for Indian homeowners.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                {benefit.stat}
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Cultural Impact Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-blue-600/5 dark:bg-blue-400/5"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Share{" "}
            <span className="text-blue-600 dark:text-blue-400">
              India’s Soul
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hosting isn’t just about income—it’s about showcasing India’s rich
            heritage and hospitality to the world.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="text-center">
            <GlobeIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Cultural Exchange
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Invite guests to experience Diwali celebrations, savor home-cooked
              biryani, or explore local temples.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <MapPinIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Local Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Boost your community by guiding guests to nearby markets,
              artisans, and hidden gems in your city.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <HeartIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Personal Touch
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create unforgettable memories for guests with personalized
              welcomes and local recommendations.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Start in{" "}
            <span className="text-blue-600 dark:text-blue-400">
              3 Easy Steps
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Launch your hosting business in just 15 minutes.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative text-center"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 shadow-md">
                  {step.number}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Powerful Tools Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-blue-600/5 dark:bg-blue-400/5"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Powerful{" "}
            <span className="text-blue-600 dark:text-blue-400">Tools</span> for
            Hosts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Manage multiple properties effortlessly with our cutting-edge tools
            designed for Indian hosts.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-10 h-10 bg-blue-600/10 dark:bg-blue-400/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/20 dark:group-hover:bg-blue-400/20">
                <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Success Story Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Host{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Success Story
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            See how Indian hosts are thriving with StayFinder.
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  />
                ))}
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  5.0 Rating
                </span>
              </div>
              <blockquote className="text-xl text-gray-600 dark:text-gray-300 italic mb-6 leading-relaxed">
                “Hosting my beachside cottage in Goa on StayFinder has been
                life-changing. I’ve earned ₹6 lakhs in 10 months, hosting guests
                from 30 countries. The real-time chat and AI pricing tools make
                managing bookings a breeze.”
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  A
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Anita Desai
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Beach Cottage Host, Goa
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600/5 dark:bg-blue-400/5 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Anita’s Achievements
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Monthly Earnings
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    ₹60,000
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Occupancy Rate
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    90%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Guest Reviews
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    4.9/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Total Guests
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    150+
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Your{" "}
            <span className="text-blue-600 dark:text-blue-400">Questions</span>{" "}
            Answered
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about hosting with StayFinder.
          </p>
        </motion.div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full -translate-y-16 translate-x-16"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <div className="relative z-10">
              <ZapIcon className="w-12 h-12 mx-auto mb-6 text-white" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Unlock Your Property’s Potential
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join StayFinder’s thriving community of Indian hosts and turn
                your space into a lucrative business. Start today and earn
                tomorrow!
              </p>
              <button
                onClick={handleCTA}
                className="group bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[200px]"
              >
                <span className="flex items-center justify-center">
                  Become a Host Now
                  <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default BecomeHost;

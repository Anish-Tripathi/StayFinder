import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Facebook,
  Twitter,
  Instagram,
  Github,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isAuthenticated] = useState(!!localStorage.getItem("token"));

  const footerSections = [
    {
      title: "Explore",
      links: [
        { name: "Properties", href: "/properties" },
        { name: "Search", href: "/search" },
        { name: "Bookings", href: "/bookings" },
        { name: "Dashboard", href: "/host" },

        { name: "Favorites", href: "/favorites" },
      ],
    },
    {
      title: "Discover",
      links: [
        { name: "Become a host", href: "/become-host" },
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Safety Tips", href: "/safety" },
        { name: "Profile Settings", href: "/settings" },
        { name: "Share your thoughts", href: "/feedback" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* About StayFinder */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4 mr-5">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                StayFinder
              </span>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
              Discover unique stays and memorable experiences with StayFinder —
              your trusted platform for secure, seamless, and personalized
              travel bookings across the globe.
            </p>
            <div className="flex space-x-5">
              {[
                { Icon: Facebook, href: "https://facebook.com/stayfinder" },
                { Icon: Twitter, href: "https://twitter.com/stayfinder" },
                { Icon: Instagram, href: "https://instagram.com/stayfinder" },
                { Icon: Github, href: "https://github.com/stayfinder" },
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Explore Sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-blue-400  mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {isAuthenticated ? (
                  section.links.map((link) => (
                    <motion.li key={link.name} variants={itemVariants}>
                      <Link
                        to={link.href}
                        className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))
                ) : (
                  <li className="text-base text-gray-400 dark:text-gray-500">
                    Sign in to explore
                  </li>
                )}
              </ul>
            </motion.div>
          ))}

          {/* Contact Us */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-blue-400  mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4 text-base text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-900 dark:text-blue-400 flex-shrink-0 hover:text-blue-600" />
                <span>
                  Tower-9, BKC,
                  <br />
                  Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gray-900 dark:text-blue-400 flex-shrink-0 hover:text-blue-600" />
                <a
                  href="tel:+91-9876543210"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  +91-9876543210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gray-900 dark:text-blue-400 flex-shrink-0 hover:text-blue-600 " />
                <a
                  href="mailto:support@stayfinder.in"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  support@stayfinder.in
                </a>
              </li>
              <li className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-3 text-blue-900 hover:text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <Link
                  to="/feedback"
                  className="hover:text-blue-600 dark:hover:text-blue-400 "
                >
                  Get in touch
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-base text-gray-500 dark:text-gray-400"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-6 mb-4 md:mb-0 hover:text-blue-600">
            <span>
              © {currentYear} StayFinder India Pvt. Ltd. All rights reserved.
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center hover:text-blue-600">
              <Globe className="h-5 w-5 mr-2 hover:text-blue-600" />
              English (IND)
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

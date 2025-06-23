import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { features } from "../../utils/features";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="text-black dark:text-white">Why Choose </span>
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
              StayFinder
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Enhancing every aspect of your travel planning with smart,
            user-focused innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ready to Explore Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16  rounded-3xl p-6 text-center text-blue-600 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gray-900">Ready to explore </span>
              <span className="text-blue-600">the world?</span>
            </h3>

            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Join millions of travelers who trust us to find their perfect stay
            </p>
            <Link to="/search">
              <button className="bg-blue-600 backdrop-blur-sm text-white font-semibold px-7 py-2 rounded-xl transition-all duration-300 hover:scale-105">
                Start Your Journey
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

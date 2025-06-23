import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categoryGroups } from "../../utils/categories";

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Find Your <span className="text-blue-600">Perfect Escape</span>
          </h2>
        </motion.div>

        {categoryGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              {(() => {
                const fullTitle = group.categories.join(" & ");
                const splitIndex = fullTitle.indexOf(" & ");
                const before = fullTitle.substring(0, splitIndex);
                const after = fullTitle.substring(splitIndex);

                return (
                  <h3 className="text-2xl md:text-3xl font-bold">
                    <span className="text-gray-900 dark:text-white">
                      {before}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {after}
                    </span>
                  </h3>
                );
              })()}

              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                {group.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.locations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                  className="group cursor-pointer"
                >
                  <Link to="/search">
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="relative h-64">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {location.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {location.country}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;

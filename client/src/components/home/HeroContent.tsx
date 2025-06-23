import { Search, MapPin, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

interface HeroContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const HeroContent = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: HeroContentProps) => {
  return (
    <div className="text-center max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Find Your Perfect
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-accent-400 block md:inline"
          >
            {" "}
            Stay
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-2xl text-gray-100 mb-7 max-w-4xl mx-auto leading-relaxed"
        >
          Discover stays from snug apartments to high-end villas worldwide.
        </motion.p>
      </motion.div>

      {/* Enhanced Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl px-10 py-3 shadow-2xl border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Where */}
            <div className="md:col-span-2">
              <motion.label
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="block text-md font-semibold text-gray-900 dark:text-gray-300 mb-2"
              >
                Where
              </motion.label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations"
                  className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-200 hover:border-gray-300"
                />
              </div>
            </div>

            {/* Check-in */}
            <div>
              <motion.label
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="block text-md font-semibold text-gray-900 dark:text-gray-300 mb-2"
              >
                Check-in
              </motion.label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-gray-300"
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <motion.label
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="block text-md font-semibold text-gray-900 dark:text-gray-300 mb-2"
              >
                Guests
              </motion.label>
              <div className="relative group">
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
                <select className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white appearance-none transition-all duration-200 hover:border-gray-300 cursor-pointer">
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4+ guests</option>
                </select>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-5 flex justify-center"
          >
            <button
              type="submit"
              onClick={handleSearch}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-12 py-2 rounded-xl font-semibold flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
            >
              <Search className="h-4 w-4" />
              <span className="text-md">Search</span>
            </button>
          </motion.div>
        </div>

        {/* Floating Search Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-6 flex justify-center space-x-8 text-white"
        >
          <div className="text-center">
            <div className="text-2xl font-bold">50K+</div>
            <div className="text-sm">Properties</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">200+</div>
            <div className="text-sm">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">10K+</div>
            <div className="text-sm">Verified Hosts</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold">1M+</div>
            <div className="text-sm">Happy Guests</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;

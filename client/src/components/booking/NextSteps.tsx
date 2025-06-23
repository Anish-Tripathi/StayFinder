import { motion } from "framer-motion";

export const NextSteps = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="card p-6"
  >
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
      What's Next?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          title: "Get Ready",
          description:
            "Pack your bags and prepare for your trip. Check the weather and local guidelines.",
        },
        {
          title: "Check In",
          description:
            "Arrive at your destination and check in with your host. Contact details will be shared 24 hours before.",
        },
        {
          title: "Enjoy & Review",
          description:
            "Have a great stay! Don't forget to leave a review for your host after checkout.",
        },
      ].map((step, index) => (
        <div key={index} className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
            <span className="text-primary-600 dark:text-primary-400 font-semibold">
              {index + 1}
            </span>
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
);

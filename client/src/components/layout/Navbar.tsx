import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  MessageCircle,
  Sun,
  Moon,
  Monitor,
  Home as HomeIcon,
  Heart,
  FileText,
  Shield,
  MessageSquare,
  Repeat,
  CalendarDays,
  Plus,
} from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isHostMenuOpen, setIsHostMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useThemeStore();
  const { user, logout } = useAuthStore();

  // Refs for dropdowns
  const profileRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hostMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        themeRef.current &&
        !themeRef.current.contains(event.target as Node)
      ) {
        setIsThemeOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        hostMenuRef.current &&
        !hostMenuRef.current.contains(event.target as Node)
      ) {
        setIsHostMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleBecomeHost = () => {
    // Assuming you have a route or action to switch to host role
    navigate("/become-host"); // Replace with actual route
    setIsMenuOpen(false);
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <HomeIcon className="h-5 w-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              StayFinder
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 mx-6">
            <Link
              to="/"
              className={`px-2 py-2 rounded-lg font-medium transition-colors text-md flex items-center ${
                location.pathname === "/"
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`px-2 py-2 rounded-lg font-medium transition-colors text-md flex items-center ${
                location.pathname === "/search"
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              }`}
            >
              Properties
            </Link>

            {user && (
              <>
                <Link
                  to="/bookings"
                  className={`px-2 py-2 rounded-lg font-medium transition-colors text-md flex items-center ${
                    location.pathname === "/bookings"
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  Bookings
                </Link>
                <Link
                  to="/favorites"
                  className={`px-2 py-2 rounded-lg font-medium transition-colors text-md flex items-center ${
                    location.pathname === "/favorites"
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  Favorites
                </Link>
              </>
            )}

            {/* Host Dropdown for Host Users */}
            {user?.role === "host" && (
              <div className="relative" ref={hostMenuRef}>
                <button
                  onClick={() => setIsHostMenuOpen(!isHostMenuOpen)}
                  className={`px-2 py-2 rounded-lg font-medium transition-colors text-md flex items-center ${
                    isHostMenuOpen || location.pathname.includes("/host")
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  Host
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${
                      isHostMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {isHostMenuOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                    >
                      <Link
                        to="/host"
                        className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsHostMenuOpen(false)}
                      >
                        <HomeIcon className="inline h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/host/bookings"
                        className={`block px-4 py-2 text-sm ${
                          location.pathname === "/host/bookings"
                            ? "text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-700"
                            : "text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setIsHostMenuOpen(false)}
                      >
                        <CalendarDays className="inline h-4 w-4 mr-2" />
                        Property Bookings
                      </Link>
                      <Link
                        to="/host/listings/new"
                        className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsHostMenuOpen(false)}
                      >
                        <Plus className="inline h-4 w-4 mr-2" />
                        Add Listing
                      </Link>
                      <Link
                        to="/host/messages"
                        className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsHostMenuOpen(false)}
                      >
                        <MessageCircle className="inline h-4 w-4 mr-2" />
                        Messages
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Become Host Button for Guest Users */}
            {user?.role === "guest" && (
              <button
                onClick={handleBecomeHost}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Become a Host
              </button>
            )}
          </div>

          {/* Desktop Right Menu (Theme, Messages, Profile) */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <Link
                to="/messages"
                className="relative p-1 text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center translate-x-1/2 -translate-y-1/2">
                  3
                </span>
              </Link>
            )}

            {/* Theme Selector */}
            <div className="relative" ref={themeRef}>
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="p-3 text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {theme === "light" && <Sun className="h-5 w-5" />}
                {theme === "dark" && <Moon className="h-5 w-5" />}
                {theme === "system" && <Monitor className="h-5 w-5" />}
              </button>
              <AnimatePresence>
                {isThemeOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                  >
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            setTheme(
                              option.value as "light" | "dark" | "system"
                            );
                            setIsThemeOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Icon className="h-4 w-4 mr-3" />
                          {option.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-0.5 border rounded-full dark:border-gray-600 hover:shadow-md transition-shadow"
                >
                  <div className="h-9 w-9 bg-primary-600 rounded-full flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={`http://localhost:5000/${user.avatar}`}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-9 w-9 object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                  </div>
                </motion.button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="inline h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/terms"
                        className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FileText className="inline h-4 w-4 mr-2" />
                        Terms
                      </Link>
                      <Link
                        to="/safety"
                        className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Shield className="inline h-4 w-4 mr-2" />
                        Safety
                      </Link>
                      <Link
                        to="/feedback"
                        className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <MessageSquare className="inline h-4 w-4 mr-2" />
                        Feedback
                      </Link>
                      <hr className="my-1 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-2 py-1 rounded-lg font-medium text-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-2">
              {user ? (
                <>
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/search"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Properties
                  </Link>
                  <Link
                    to="/bookings"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Bookings
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites
                  </Link>
                  <Link
                    to="/messages"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Messages
                    <span className="ml-2 h-5 w-5 bg-blue-600 rounded-full text-white text-xs flex items-center justify-center">
                      3
                    </span>
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>

                  {/* Host Menu for Mobile */}
                  {user?.role === "host" && (
                    <>
                      <div className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Host Menu
                      </div>
                      <Link
                        to="/host"
                        className="block px-5 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <HomeIcon className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/host/bookings"
                        className="block px-5 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <CalendarDays className="h-4 w-4 mr-2" />
                        Received Bookings
                      </Link>
                      <Link
                        to="/host/listings/new"
                        className="block px-5 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Listing
                      </Link>
                      <Link
                        to="/host/messages"
                        className="block px-5 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Messages
                      </Link>
                    </>
                  )}

                  {/* Become Host for Guest */}
                  {user?.role === "guest" && (
                    <button
                      onClick={handleBecomeHost}
                      className="block w-full text-left px-3 py-2 text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                    >
                      <Repeat className="h-4 w-4 mr-2" />
                      Become a Host
                    </button>
                  )}

                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                  <Link
                    to="/terms"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Terms
                  </Link>
                  <Link
                    to="/safety"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Safety
                  </Link>
                  <Link
                    to="/feedback"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Feedback
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/search"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Properties
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-primary-600 dark:text-primary-400 rounded-lg font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <Link
                    to="/terms"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Terms
                  </Link>
                  <Link
                    to="/safety"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Safety
                  </Link>
                  <Link
                    to="/feedback"
                    className="block px-3 py-2 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Feedback
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

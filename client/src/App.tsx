import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/themeStore";
import { useAuthStore } from "./store/authStore";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import HostDashboard from "./pages/host/Dashboard";
import BookingConfirmation from "./pages/BookingConfirmation";
import Messages from "./pages/Messages";
import BookingHistory from "./pages/BookingHistory";
import CreateListing from "./pages/host/CreateListing";
import EditListing from "./pages/host/EditListing";
import Settings from "./pages/Settings";
import Bookings from "./pages/host/Bookings";
import PaymentPage from "./pages/Payment";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FeedbackPage from "./pages/Feedback";
import ScrollToTop from "./components/layout/ScrollToTop";
import Favorites from "./pages/Favorites";
import BecomeHost from "./pages/BecomeHost";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const { theme } = useThemeStore();
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        if (systemTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      } else if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/host" element={<HostDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/bookings" element={<BookingHistory />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/safety" element={<Privacy />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route
            path="/booking-confirmation/:id"
            element={<BookingConfirmation />}
          />
          <Route path="/host/listings/new" element={<CreateListing />} />
          <Route path="/host/bookings" element={<Bookings />} />
          <Route path="/host/listings/:id/edit" element={<EditListing />} />
          <Route path="/host/messages" element={<Messages />} />{" "}
          <Route path="/messages" element={<Messages />} />
          <Route path="/become-host" element={<BecomeHost />} />{" "}
        </Routes>
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === "dark" ? "#374151" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#000000",
            border:
              theme === "dark" ? "1px solid #4b5563" : "1px solid #e5e7eb",
          },
        }}
      />
    </div>
  );
}

export default App;

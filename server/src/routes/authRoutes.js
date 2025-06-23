import express from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  logout,
  uploadAvatar,
  updateNotificationPreferences,
  updateAccountPreferences,
} from "../controllers/authController.js";

import { avatarUpload } from "../config/multerConfig.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("firstName")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("First name must be between 2 and 50 characters"),
    body("lastName")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Last name must be between 2 and 50 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("role")
      .optional()
      .isIn(["guest", "host"])
      .withMessage("Role must be either guest or host"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  login
);

router.get("/me", auth, getMe);

router.put(
  "/profile",
  auth,
  [
    body("firstName")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("First name must be between 2 and 50 characters"),
    body("lastName")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Last name must be between 2 and 50 characters"),
    body("phone")
      .optional()
      .matches(/^\+?[\d\s-()]+$/)
      .withMessage("Please provide a valid phone number"),
    body("bio")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Bio cannot exceed 500 characters"),
  ],
  updateProfile
);

router.post(
  "/change-password",
  auth,
  [
    body("currentPassword")
      .exists()
      .withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
  ],
  changePassword
);

router.put("/avatar", auth, avatarUpload.single("avatar"), uploadAvatar);
router.put("/notifications", auth, updateNotificationPreferences);
router.put("/account-preferences", auth, updateAccountPreferences);

router.post("/logout", auth, logout);

export default router;

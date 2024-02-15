import express from "express";
import {
  authUser,
  registerUser,
  otpVerify,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllCourses,
  searchSortFilterCourses,
  courseCategory,
  getInstructor,
  googleAuth,
  getSingleCourseById,
} from "../controllers/userController.js";
import { createChat, userChats } from "../controllers/chatController.js";
import { viewCourse } from "../controllers/courseController.js";

import {
  setStripeSession,
  getPurchaseByUser,
} from "../controllers/paymentController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile/:id")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/otpverify", otpVerify);
router.get("/getcourse", getAllCourses);
// router.get("/getcourse/search", searchCourses);
router.get("/getcourse/searchSortFilter", searchSortFilterCourses);
router.get("/getcourse/:id", protect, viewCourse);
router.get("/getCategory/:categoryId", courseCategory);
router.get("/getInstructor/:instructorId", getInstructor);

router.post("/create-checkout-session/:price", protect, setStripeSession);
router.post("/google",googleAuth);
router.get("/:userId/purchaselist", getPurchaseByUser);
router.get("/:purchaseId/course", protect, getSingleCourseById);
router.get("/chat/getChats",userChats)
export default router;

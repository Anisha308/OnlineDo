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
  userrating,
  fetchRating,
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
router.route("/profile/:id").get(getUserProfile).put(updateUserProfile);
router.post("/otpverify", otpVerify);
router.get("/getcourse", getAllCourses);
router.get("/getcourse/searchSortFilter", searchSortFilterCourses);
router.get("/getcourse/:id", viewCourse);
router.get("/getCategory/:categoryId", courseCategory);
router.get("/getInstructor/:instructorId", getInstructor);

router.post("/create-checkout-session/:price", setStripeSession);
router.post("/google", googleAuth);
router.get("/:userId/purchaselist", getPurchaseByUser);
router.get("/:purchaseId/course", getSingleCourseById);
router.get("/chat/getChats", userChats);
router.route("/rating").post(userrating).get(fetchRating);

export default router;

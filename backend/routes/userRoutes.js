import express from "express";
import {
  authUser,
  registerUser,
  otpVerify,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllCourses,
  searchCourses,
  sortCourses,
  filterCourses,
  viewCourse,
  
} from "../controllers/userController.js";
import {setstripe} from "../controllers/paymentController.js"
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile/:id").get(protect,getUserProfile).put(protect,updateUserProfile);
router.post("/otpverify", otpVerify);
router.get("/getcourse", getAllCourses);
router.get("/getcourse/search", searchCourses);
router.get("/getcourse/sort", sortCourses);
router.get("/getcourse/filter",filterCourses);
router.get("/getcourse/:id",protect,viewCourse)
router.post("/create-checkout-session/:price",protect,setstripe);

export default router;

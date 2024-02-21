const router = express.Router();
import express from "express";
import { adminProtect } from "../middleware/adminAuthMiddleware.js";

import {
  authAdmin,
  blockUser,
  getAllUsers,
  getAllInstructors,
  blockInstructor,
  verifyInstructor,
  logoutAdmin,
  unblockInstructor,
  rejectmail,
  countInstructor,
  countUser,
  CountCourse,
 
} from "../controllers/adminController.js";
import { YearlyRevenue,
  MonthlyRevenue} from "../controllers/paymentController.js"
import { addCategories,
  getCategories
} from "../controllers/categoryController.js"
  import { viewCourse,instructorcourse } from "../controllers/courseController.js";
router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);

router.get("/userlist", adminProtect, getAllUsers);
router.get("/instructorlist", adminProtect, getAllInstructors);
router.put(
  "/unblock-instructor/:instructorId",
  adminProtect,
  unblockInstructor
);

router.post("/block-user/:userId", adminProtect, blockUser);
router.post("/block-instructor/:instructorId", adminProtect, blockInstructor);
router.put("/verify-instructor/:instructorId", adminProtect, verifyInstructor);
router.post("/sendmail", rejectmail);

router.post("/addcategory", adminProtect, addCategories);
router.get("/getcategory", adminProtect, getCategories);
router.get("/getCourse/:id", viewCourse);
router.get("/courselist/:id", instructorcourse)
router.get('/countuser', countUser)
router.get("/countinstructor", countInstructor);
router.get("/countcourse", CountCourse)
router.get("/yearlyrevenue", YearlyRevenue);
router.get("/monthlyrevenue", MonthlyRevenue);
export default router;

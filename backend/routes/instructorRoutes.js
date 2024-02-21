import express from "express";
const router = express.Router();
import {
  authInstructor,
  registerInstructor,
  logoutInstructor,
  getInstructorProfile,
  updateInstructProfile,
  getInstructorCourses,
  instructotpVerify,
  showCategory,
  instructorviewCourse,
  getusers,
} from "../controllers/instructorController.js";
import { YearlyRevenue,MonthlyRevenue } from "../controllers/paymentController.js";
import {
  addCourse,
  getcoursetoupdate,
  updatecourse,
  getchpurchase,
} from "../controllers/courseController.js";
import { instructorProtect } from "../middleware/instructorAuthMiddleware.js";

router.post("/", registerInstructor);
router.post("/auth", authInstructor);
router.post("/logout", logoutInstructor);
router
  .route("/showprofile/:id")
  .get(instructorProtect, getInstructorProfile)
  .put(instructorProtect, updateInstructProfile);
router.post("/addcourse/:instructorId", instructorProtect, addCourse);
router.get(
  "/:instructorId/courselist",
  instructorProtect,
  getInstructorCourses
);
router.post("/instructotpverify", instructotpVerify);
router.get("/categories", instructorProtect, showCategory);
router.get("/instructorcourse/:id", instructorProtect, instructorviewCourse);
router.put("/updatecourse/:id", instructorProtect, updatecourse);
router.get("/:id/courselist", instructorProtect, getcoursetoupdate);
router.get("/purchaselist", getchpurchase)
router.get("/getusers", getusers)
router.get("/yearlyrevenue", YearlyRevenue);
router.get("/monthlyrevenue", MonthlyRevenue);

export default router;

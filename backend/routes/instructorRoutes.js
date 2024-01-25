import express from "express";
const router = express.Router();
import {
  authInstructor,
  registerInstructor,
  logoutInstructor,
  getInstructorProfile,
  updateInstructProfile,
  addCourse,
  getInstructorCourses,
  instructotpVerify,
  showCategory,
  instructorviewCourse,
  updatecourse,
  getcoursetoupdate,
} from "../controllers/instructorController.js";
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
export default router;

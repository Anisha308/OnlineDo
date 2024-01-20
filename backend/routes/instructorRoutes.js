import express from 'express';
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
 
} from "../controllers/instructorController.js";
import { instructorProtect } from "../middleware/instructorAuthMiddleware.js"


router.post("/",registerInstructor);
router.post("/auth", authInstructor);
router.post("/logout",logoutInstructor);
router.route("/showprofile/:id").get(instructorProtect,getInstructorProfile).put(instructorProtect,updateInstructProfile)
router.post("/addcourse/:instructorId",instructorProtect, addCourse);
router.get("/:instructorId/courselist",instructorProtect,getInstructorCourses);
router.post("/instructotpverify", instructotpVerify);
router.get("/categories",instructorProtect, showCategory)

export default router;
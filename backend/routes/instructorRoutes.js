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
  addCategories,
  getCategories,
  showCategory,
  courseCategory,
  getInstructor,
} from "../controllers/instructorController.js";
import { protect } from "../middleware/instructorAuthMiddleware.js"


router.post("/", registerInstructor);
router.post("/auth", authInstructor);
router.post("/logout", logoutInstructor);
router.route("/showprofile/:id").get(getInstructorProfile).put(updateInstructProfile)
router.post('/addcourse/:instructorId', addCourse);  // Added this line for the new route
router.get("/:instructorId/courselist" ,getInstructorCourses);
router.post("/instructotpverify", instructotpVerify);
router.post("/addcategory", addCategories);
router.get("/getcategory", getCategories)
router.get("/categories", showCategory)
router.get("/getCategory/:categoryId", courseCategory)
router.get('/getInstructor/:instructorId',getInstructor)
export default router;
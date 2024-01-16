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
import { instructorProtect } from "../middleware/instructorAuthMiddleware.js"


router.post("/",registerInstructor);
router.post("/auth", authInstructor);
router.post("/logout",logoutInstructor);
router.route("/showprofile/:id").get(instructorProtect,getInstructorProfile).put(instructorProtect,updateInstructProfile)
router.post("/addcourse/:instructorId",instructorProtect, addCourse);
router.get("/:instructorId/courselist",instructorProtect,getInstructorCourses);
router.post("/instructotpverify", instructotpVerify);
router.post("/addcategory",instructorProtect,addCategories)
router.get("/getcategory",instructorProtect, getCategories)
router.get("/categories",instructorProtect, showCategory)
router.get("/getCategory/:categoryId",courseCategory)
router.get('/getInstructor/:instructorId',getInstructor)
export default router;
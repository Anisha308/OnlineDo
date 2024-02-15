import asyncHandler from "express-async-handler";
import Instructor from "../models/InstructorModel.js";
import Course from "../models/courseModel.js";
import { toast } from "react-toastify";
import Purchase from "../models/purchaseModel.js";


const viewCourse = asyncHandler(async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log(courseId,'ppp');
    const course = await Course.findById(courseId);
    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error fetching course", error);
  }
});
const instructorcourse = asyncHandler(async (req, res) => {
  try {
    const instructorId = req.params.id;
    console.log(instructorId, 'instructorid');

    // Fetch courses for the given instructorId
    const courses = await Course.find({ instructor: instructorId });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses for instructor", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});



const addCourse = asyncHandler(async (req, res) => {
  const instructorId = req.params.instructorId;
  console.log(instructorId,'pp');
  const {
    courseName,
    paid,
    description,
    duration,
    price,
    modules,
    categories,
    image,
    previewVideo,
  } = req.body;
console.log(req.body,'req.body');
  if (
    !courseName ||
    !description ||
    !modules ||
    modules.length === 0 ||
    !categories ||
    !image ||
    !previewVideo
  ) {
    toast.error("All fields must be filled");
    res.status(400).json({ error: "All fields must be filled" });
    return;
  }
   const emptyModuleIndex = modules.findIndex((module) => !module.title.trim());
   if (emptyModuleIndex !== -1) {
     toast.error("Please enter a title for all modules");
     return res
       .status(400)
       .json({ error: "Please enter a title for all modules" });
     
   }

  try {
    // Check if the instructor exists
    const instructor = await Instructor.findById(instructorId);
    console.log(instructor,'instructor');
    if (!instructor) {
      res.status(404);
      throw new Error("Instructor not found");
    }

const existingCourse = await Course.findOne({
  instructor: instructorId,
  courseName,
});
    console.log(existingCourse,'existssss');
    if (existingCourse) {
  console.log('dups');
  res.status(400).json({ error: "dup" });
  return;
}

    // Create a new course
    const course = new Course({
      instructor: instructorId,
      courseName,
      paid,
      description,
      category: categories,
      thumbnail: image,
      duration,
      price,
      modules, // Corrected to use the modules state
      previewVideo,
    });
console.log(course,'course');
    if (req.file) {
      // Assuming you want to add the file to the first module's videos
      if (
        modules.length > 0 &&
        modules[0].videos &&
        modules[0].videos.length > 0
      ) {
        modules[0].videos[0].video.data = req.file.buffer;
        modules[0].videos[0].video.contentType = req.file.mimetype;
      }
    }
  
    // Save the course
    const savedCourse = await course.save();
    console.log(savedCourse,'saves');
    // Add the course to the instructor's courses array
    instructor.courses.push(savedCourse._id);
    await instructor.save();

    res.status(200).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}); 



const getchpurchase = asyncHandler(async (req, res) => {
  try {
     const instructorId = req.query.instructorId
  
    const result = await Purchase.find({ instructor: instructorId })
      .populate("user")
      .populate("courses");;
      res.status(200).json(result);

  } catch (error) {
    console.log(error,'error');
  }
 
})
const updatecourse = asyncHandler(async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = req.body;

    const result = await Course.findByIdAndUpdate(courseId, updatedCourse, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }

    res
      .status(200)
      .json({ message: "Course updated successfully", course: result });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getcoursetoupdate = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const course = await findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course fetched successfully", course });
  } catch (error) {
    console.error(error);
  }
});
export {instructorcourse,viewCourse, addCourse, updatecourse, getcoursetoupdate, getchpurchase };

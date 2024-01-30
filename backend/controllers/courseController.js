import asyncHandler from "express-async-handler";
import Instructor from "../models/InstructorModel.js";
import Course from "../models/courseModel.js";
import { toast } from "react-toastify";

const addCourse = asyncHandler(async (req, res) => {
  const instructorId = req.params.instructorId;
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
  console.log(previewVideo, "previewVideo");

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
    console.log("ayyuo");
    const instructor = await Instructor.findById(instructorId);
    console.log(instructor, "hjhk");
    if (!instructor) {
      res.status(404);
      throw new Error("Instructor not found");
    }

const existingCourse = await Course.findOne({
  instructor: instructorId,
  courseName,
});
    console.log(existingCourse, 'exists');
    
if (existingCourse) {
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

    console.log(course, "course");
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
    console.log(savedCourse,'saved course');
    // Add the course to the instructor's courses array
    instructor.courses.push(savedCourse._id);
    await instructor.save();

    res.status(200).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
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
    console.log(id, "id");
    const course = await findById(id);
    console.log(course, "course");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course fetched successfully", course });
  } catch (error) {
    console.error(error);
  }
});
export { addCourse, updatecourse, getcoursetoupdate };
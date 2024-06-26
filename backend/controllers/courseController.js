import asyncHandler from "express-async-handler";
import Instructor from "../models/InstructorModel.js";
import Course from "../models/courseModel.js";
import { toast } from "react-toastify";
import Purchase from "../models/purchaseModel.js";

const viewCourse = asyncHandler(async (req, res) => {
  try {
    console.log('hmmmm');
    const courseId = req.params.id;
    console.log(courseId);
    const course = await Course.findById(courseId);
    console.log(course);
    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error fetching course", error);
  }
});


const instructorcourse = asyncHandler(async (req, res) => {
  try {
    const instructorId = req.params.id;

    const courses = await Course.find({ instructor: instructorId });
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses for instructor", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

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
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      res.status(404);
      throw new Error("Instructor not found");
    }

    const existingCourse = await Course.findOne({
      instructor: instructorId,
      courseName,
    });
    if (existingCourse) {
      res.status(400).json({ error: "dup" });
      return;
    }

    const course = new Course({
      instructor: instructorId,
      courseName,
      paid,
      description,
      category: categories,
      thumbnail: image,
      duration,
      price,
      modules,
      previewVideo,
    });
    if (req.file) {
      if (
        modules.length > 0 &&
        modules[0].videos &&
        modules[0].videos.length > 0
      ) {
        modules[0].videos[0].video.data = req.file.buffer;
        modules[0].videos[0].video.contentType = req.file.mimetype;
      }
    }

    const savedCourse = await course.save();
    instructor.courses.push(savedCourse._id);
    await instructor.save();

    res.status(200).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getchpurchase = asyncHandler(async (req, res) => {
  try {
    const instructorId = req.query.instructorId;
    console.log(instructorId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalDocs = await Purchase.countDocuments({
      instructor: instructorId,
    });
    console.log(totalDocs);
    const totalPages = Math.ceil(totalDocs / limit);

    const result = await Purchase.find({ instructor: instructorId })
      .populate("user")
      .populate("courses")
      .skip((page - 1) * limit)
      .limit(limit);
    console.log(result);
    res.status(200).json({
      data: result,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Internal server error" });
  }
});

const updatecourse = asyncHandler(async (req, res) => {
  try {
    const {
      id,
      courseName,
      description,
      price,
      duration,
      paid,
      categories,
      modules,
      image,
      previewVideo,
    } = req.body;
    const updatecourse = await Course.findByIdAndUpdate(
      id,
      {
        courseName,
        description,
        price,
        duration,
        paid,
        categories,
        modules,
        image,
        previewVideo,
      },
      { new: true }
    );

    if (!updatecourse) {
      return res.status(404).json({ error: "course not found" });
    }
    res.json(updatecourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res
      .status(500)
      .json({ error: "Failed to update course. Please try again later." });
  }
});

const getcoursetoupdate = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course fetched successfully", course });
  } catch (error) {
    console.error(error);
  }
});
export {
  instructorcourse,
  viewCourse,
  addCourse,
  updatecourse,
  getcoursetoupdate,
  getchpurchase,
};

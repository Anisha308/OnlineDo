// models/CourseModel.js

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Assuming you have an Instructor model
  },
  categoryName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  liststatus: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;

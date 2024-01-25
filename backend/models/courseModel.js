// models/CourseModel.js

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor", // Assuming you have an Instructor model
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    paid: { type: String, required: true },

    duration: {
      type: String,
      required: true,
    },
    modules: [
      {
        title: {
          type: String,
          required: true,
        },
        videos: [
          {
            url: {
              type: String,
              required: true,
            },
          },
        ], // Assuming you store URLs or file paths as strings
      },
    ],
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;

import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler";
import Instructor from "../models/InstructorModel.js";

const instructorProtect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.instructorjwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.INSTRUCTOR_SECRET);
      console.log(decoded,'oooooooooooooooooooooooooo');
      req.instructor = await Instructor.findById(decoded.instructorId).select("-password");
       if (!req.instructor) {
        res.status(401)
        throw new Error("Not authorzied,user not found")
      }

      const { role } = req.instructor
      if (role && role.includes('instructor')) {
       
        next();
      } else {
        res.status(403);
        throw new Error('Not authorized, insufficient privileges');

      }
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res
      .status(401)
      .json({ message: "Not authorized, no tokensssssssssssssss" });
  }
});

export { instructorProtect };

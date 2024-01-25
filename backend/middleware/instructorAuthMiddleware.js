import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler";

const instructorProtect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.instructorjwt;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized, token not found" });
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.INSTRUCTOR_SECRET);

      if (decoded.role !== "instructor") {
        res.status(401).json({ error: "Not authorized, user not found" });
      } else {
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
});

export { instructorProtect };

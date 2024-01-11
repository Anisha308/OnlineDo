import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

const adminProtect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.adminJwt;

  if (token) {
    try {
const decoded = jwt.verify(token, process.env.ADMINJWT_SECRET);
      req.admin = await Admin.findById(decoded.adminId).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
     res.status(401).json({ message: "Not authorized, no tokensssssssssssssss" });

  }
});

export { adminProtect };

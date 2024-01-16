import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

const adminProtect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.adminJwt;

   if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
    try {
      const decoded = jwt.verify(token, process.env.ADMINJWT_SECRET);
      console.log(decoded,"admindecodedddddddddddddddddd");
      req.admin = await Admin.findById(decoded.adminId).select("-password");
      console.log(req.admin);
      if (!req.admin) {
         res.status(401)
        throw new Error("Not authorzied,user not found")
      
      }

      const { role } = req.admin
      console.log(role,'role');
      if (role && role.includes('admin')) {
        console.log('yeeeeeee');
        next();
      } else {
        res.status(403);
        throw new Error('Not authorized, insufficient privileges');

      }
      
    } catch (error) {
      // Handle different types of JWT errors
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(401).json({ message: "Not authorized, token verification failed" });
      }
    }
  
});

export { adminProtect };

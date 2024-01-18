import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

const adminProtect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.adminJwt;

   if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
  if(token){
    try {
      const decoded = jwt.verify(token, process.env.ADMINJWT_SECRET);
console.log(decoded.role,'kdfjd');
      if (decoded.role !== 'admin') {
  console.log('you are not an admin');

                res.status(401).json({ error: "Not authorized, user not found" });

     } else {
        console.log("yeahjwd");
        next()
      }

    
      
    } catch (error) {
           res.status(401).json({ message: "Not authorized, token failed" });

    }
  }
});

export { adminProtect };

import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler";

const instructorProtect = asyncHandler(async (req, res, next) => {
   console.log("Checking for token:", req.cookies.instructorjwt);

  let token = req.cookies.instructorjwt;
   console.log(token, "tokennnuuuu");

  if (!token) {
    console.log('loskdj');
       return res.status(401).json({ error: "Unauthorized, token not found" });

  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.INSTRUCTOR_SECRET);
      console.log(decoded.role, 'oooooooooooooooooooooooooo');
       
      if (decoded.role !== 'instructor') {
        console.log('you are not instructor');
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

export { instructorProtect };

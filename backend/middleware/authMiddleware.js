import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const  protect = asyncHandler(async (req, res, next) => {
  console.log("Checking for token:", req.cookies.jwt);
 

  let token = req.cookies.jwt;
   console.log(token, "tokennn");
 
  if (!token) {
    console.log('amm');
   return res.status(401).json({ error: "Unauthorized, token not found" });

  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.role, 'decoded dddddddddddddddddddd  ');

    if (decoded.role !== "user") {
      console.log("kooooooooo");
      res.status(401).json({ error: "Not authorized, user not found" });
      throw new Error("Not authorized, user not found");
    } else {
      console.log("yeah");
      next();
    }
    }
  
    catch (error) {
      console.error("error",error);
  }}
})
export { protect };
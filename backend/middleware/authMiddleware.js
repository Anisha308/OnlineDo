import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
 

  token = req.cookies.jwt;
   console.log(token, "tokennn");
 
  if (!token) {
    return res.status(401).send("Unauthorized, token missing");
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded,'decoded ddddd  ');
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        res.status(401)
        throw new Error("Not authorzied,user not found")
      }

      const { role } = req.user                     
      if (role && role.includes('user')) {
        next();
      } else {
        res.status(403);
        throw new Error('Not authorized, insufficient privileges');

      }
    }
    catch (error) {
      console.error("error",error);
  }}
})
export { protect };
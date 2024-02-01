import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, token not found" });
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if (decoded.role !== "user") {
        res.status(401).json({ error: "Not authorized, user not found" });
        throw new Error("Not authorized, user not found");
      } else {
        next();
      }
    } catch (error) {
      console.error("error", error);
    }
  }
});
export { protect };

import jwt from "jsonwebtoken";

const generateTokenInstructor = (res, instructorId) => {
  const token = jwt.sign({ instructorId }, process.env.INSTRUCTOR_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("instructorjwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // Corrected maxAge to seconds
  });
};
export default generateTokenInstructor;

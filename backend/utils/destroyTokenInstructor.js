import jwt from "jsonwebtoken";

const destroyTokenInstructor = (res, instructorId) => {
  const token = jwt.sign({ instructorId }, process.env.INSTRUCTOR_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("instructorjwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "developement",
    sameSite: "strict",
    maxAge: new Date(0),
  });
};
export default destroyTokenInstructor;

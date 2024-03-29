import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId, role: "user" }, process.env.JWT_SECRET, {
    expiresIn: "40d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "devolopement",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 1000,
  });
  return token; // Add this line to return the generated token
};
export default generateToken;

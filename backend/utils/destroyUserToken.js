import jwt from "jsonwebtoken";

const destroyToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "developement",
    sameSite: "strict",
    maxAge: new Date(0),
  });
};
export default destroyToken;

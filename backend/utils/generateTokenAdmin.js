import jwt from "jsonwebtoken";

const generateTokenAdmin = (res, adminId) => {
  const token = jwt.sign(
    { adminId, role: "admin" },
    process.env.ADMINJWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("adminJwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "devolopment",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // it calculates in seconds so the seconds converting to 30 days
  });
};

export default generateTokenAdmin;

import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import generateToken from "../utils/generateToken.js";
import generateOTP from "../utils/otp.js";
import sendEmail from "../utils/nodemailer.js";
import { query } from "express";
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401);
    throw new Error("All fields must be filled!");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(401);
    throw new Error("Invalid email format");
  }

  if (password.length < 4) {
    res.status(401);
    throw new Error(
      "Invalid password. Password must be at least 6 characters long."
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (user.Blocked) {
    res.status(401);
    throw new Error("Access denied");
  }

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!email || !password || !name || !mobile) {
    res.status(401);
    throw new Error("All fields must be filled!");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(401);
    throw new Error("Invalid email format");
  }

  if (password.length < 4) {
    res.status(401);
    throw new Error(
      "Invalid password. Password must be at least 6 characters long."
    );
  }
  if (mobile.length < 10 || mobile.length > 10) {
    res.status(401);
    throw new Error("Invalid Mobile Number. Mobilenumber must be 10 digits.");
  }

  const profilephoto = req.body.profilephoto ? req.body.profilephoto : null;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const otp = generateOTP();
  res.cookie("otp", otp, { httpOnly: true, maxAge: 5 * 60 * 1000 }); // Expires in 5 minutes

  const subject = "OnlineDo";
  const text = `This is your OTP for OnlineDo account registration: ${otp}`;

  const result = await sendEmail(email, subject, text);
  if (result) {
    res.status(200).json({
      message: "OTP sent successfully",
      success: true,
      otp,
      name,
      email,
      mobile,
      password,
      profilephoto,
    });
  } else {
    res.status(400).json({ message: "OTP sending failed" });
  }
});

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const otpVerify = async (req, res) => {
  try {
    let result; // Define result before the if-else block

    const { otp, typedOtp, email, name, mobile, profilephoto, password } =
      req.body;

    if (!otp || typedOtp !== otp) {
      return res.status(401).json({ message: "Entered Code is incorrect" });
    } else {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = new User({
        email: email,
        name: name,
        password: password,
        mobile: mobile,
        profilephoto: profilephoto,
        role: "user",
      });
      await newUser.save();
      const jwtoken = generateToken(res, newUser._id);

      res.status(200).json({
        _id: newUser._id,
        name: newUser.name, // Update with the actual user properties
        email: newUser.email,
        userJwt: jwtoken,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
};

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const users = await User.findById(userId, {
      name: 1,
      email: 1,
      mobile: 1,
      profilephoto: 1,
      _id: 1,
    });

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const viewCourse = asyncHandler(async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error fetching course", error);
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobile = req.body.mobile || user.mobile;

      if (req.body.password) {
        user.password = req.body.password;
      }

      if (req.body.profilephoto) {
        user.profilephoto = req.body.profilephoto;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        profilephoto: updatedUser.profilephoto,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find(
      {},
      {
        courseName: 1,
        description: 1,
        price: 1,
        duration: 1,
        instructor: 1,
        thumbnail: 1,
        _id: 1,
      }
    ).populate("instructor", "name");
    const transformedCourses = courses.map((course) => course.toJSON());
    res.status(200).json({ success: true, courses: transformedCourses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const searchCourses = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      res.status(400).json({ error: "Query parameter is required" });
      return;
    }
    const courses = await Course.find({
      $or: [
        { coursename: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const sortCourses = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;
    let sortOption;
    switch (query) {
      case "lowtohigh":
        sortOption = { price: 1 };
        break;
      case "hightolow":
        sortOption = { price: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: 1 };
        break;
    }
    const courses = await Course.find({}).sort(sortOption);
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const filterCourses = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;
    let filterOption;
    switch (query) {
      case "1-500":
        filterOption = { price: { $gt: 1, $lte: 500 } };
        break;
      case "501-1000":
        filterOption = { price: { $gte: 501, $lte: 1000 } };
        break;
      case "1001-2000":
        filterOption = { price: { $gte: 1001, $lte: 2000 } };
        break;
      case "2001-above":
        filterOption = { price: { $gte: 2001 } };
        break;
    }

    const courses = await Course.find(filterOption);
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  otpVerify,
  getAllCourses,
  searchCourses,
  sortCourses,
  filterCourses,
  viewCourse,
};

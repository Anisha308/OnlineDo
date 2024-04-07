import asyncHandler from "express-async-handler";
import Instructor from "../models/InstructorModel.js";
import Course from "../models/courseModel.js";
import cloudinary from "cloudinary";
import Category from "../models/categoryModel.js";
import User from "../models/userModel.js";
import generateTokenInstructor from "../utils/generateTokenInstructor.js";
import generateOTP from "../utils/otp.js";
import sendEmail from "../utils/nodemailer.js";

const authInstructor = asyncHandler(async (req, res) => {
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

  const instructor = await Instructor.findOne({ email });

  if (!instructor) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  if (instructor.blocked) {
    res.status(401);
    throw new Error("You are not allowed to login ");
  }

  if (!instructor.verified) {
    res.status(401);
    throw new Error("Please wait for admin approval ");
  }
  if (await instructor.matchPassword(password)) {
    generateTokenInstructor(res, instructor._id);

    res.json({
      _id: instructor._id,
      name: instructor.name,
      email: instructor.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
const registerInstructor = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    mobile,
    experience,
    jobrole,
    companyname,
    password,
    idProof,
    profilephoto,
    experienceCertificateFile,
  } = req.body;
  if (!name || !email || !mobile || !experience || !jobrole || !companyname) {
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
  if (experience < 0) {
    res.status(401);
    throw new Error("please fill out your experience ");
  }

  const instructorExists = await Instructor.findOne({ email });
  if (instructorExists) {
    res.status(400);
    throw new Error("Instructor already exists");
  }
  const otp = generateOTP();
  res.cookie("otp", otp, { httpOnly: true, maxAge: 5 * 60 * 1000 });
  const subject = "OnlineDo";
  const text = `This is your OTP for OnlineDo Intructor account registration: ${otp}`;

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
      idProof,
      profilephoto,
      experienceCertificateFile,
    });
  } else {
    res.status(400).json({ message: "OTP sending failed" });
  }
});

const instructotpVerify = async (req, res) => {
  try {
    let result;
    const {
      otp,
      typedOtp,
      email,
      name,
      mobile,
      profilephoto,
      experienceCertificateFile,
      idProof,
      password,
      experience,
      jobrole,
      companyname,
    } = req.body;

    const profileImages = await cloudinary.uploader.upload(profilephoto, {
      folder: "profilepic",
    });
    const idProofImage = await cloudinary.uploader.upload(idProof, {
      folder: "idProof",
    });
    const experienceCertificate = await cloudinary.uploader.upload(
      experienceCertificateFile,
      {
        folder: "experienceCertificate",
      }
    );

    if (!otp || typedOtp != otp) {
      return res.status(401).json({ message: "entered code is incorrect" });
    } else {
      const existingInstructor = await Instructor.findOne({ email: email });
      if (existingInstructor) {
        return res.status(400).json({ message: "Instructor already exists" });
      }
      const newInstructor = new Instructor({
        email: email,
        name: name,
        password: password,
        mobile: mobile,
        profilephoto: profileImages.secure_url,
        idProof: idProofImage.secure_url,
        experienceCertificateFile: experienceCertificate.secure_url,
        experience: experience,
        jobrole: jobrole,
        companyname: companyname,
        role: "instructor",
      });
      await newInstructor.save();

      res.status(200).json({
        name: newInstructor.name,
        email: newInstructor.email,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
};
const logoutInstructor = (req, res) => {
  res.cookie("instructorjwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const getInstructorProfile = asyncHandler(async (req, res) => {
  try {
    const instructorId = req.params.id;
    const instructors = await Instructor.findById(instructorId, {
      name: 1,
      email: 1,
      mobile: 1,
      profilephoto: 1,
      experience: 1,
      jobrole: 1,
      companyname: 1,
      experienceCertificateFile: 1,
      idProof: 1,
      _id: 1,
    });
    res.status(200).json({ instructors });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateInstructProfile = asyncHandler(async (req, res) => {
  try {
    const instructorId = req.params.id;
    const instructor = await Instructor.findById(instructorId);
    if (instructor) {
      instructor.name = req.body.name || instructor.name;
      instructor.email = req.body.email || instructor.email;
      instructor.mobile = req.body.mobile || instructor.mobile;
      instructor.experience = req.body.mobile || instructor.experience;
      instructor.jobrole = req.body.jobrole || instructor.jobrole;
      instructor.companyname = req.body.companyname || instructor.companyname;

      if (req.body.password) {
        instructor.password = req.body.password;
      }

      if (req.body.profilephoto) {
        instructor.profilephoto = req.body.profilephoto;
      }

      const updatedInstructor = await instructor.save();

      res.json({
        _id: updatedInstructor._id,
        name: updatedInstructor.name,
        email: updatedInstructor.email,
        mobile: updatedInstructor.mobile,
        experience: updatedInstructor.experience,
        jobrole: updatedInstructor.jobrole,
        companyname: updatedInstructor.companyname,
        profilephoto: updatedInstructor.profilephoto,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getInstructorCourses = asyncHandler(async (req, res) => {
  try {
    const instructorId = req.params.instructorId;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;

    const instructor = await Instructor.findById(instructorId).populate({
      path: "courses",
      options: {
        skip: (page - 1) * pageSize,
        limit: pageSize,
      },
    });

    if (!instructor) {
      res.status(401);
      throw new Error("Instructor not found");
    }

    const totalCourses = await Course.countDocuments({
      instructor: instructorId,
    });

    const totalPages = Math.ceil(totalCourses / pageSize);

    res.status(200).json({
      success: true,
      courses: instructor.courses,
      instructor,
      pagination: {
        currentPage: page,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const showCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const instructorviewCourse = asyncHandler(async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error fetching course", error);
  }
});
const getusers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    const countusers = await User.countDocuments({});
    res.status(200).json({ success: true, users, countusers });
  } catch (error) {
    console.log(error, "error");
  }
});
export {
  authInstructor,
  registerInstructor,
  logoutInstructor,
  getInstructorProfile,
  updateInstructProfile,
  getInstructorCourses,
  instructotpVerify,
  showCategory,
  instructorviewCourse,
  getusers,
};

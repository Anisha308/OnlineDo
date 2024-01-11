import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateTokenAdmin from "../utils/generateTokenAdmin.js";
import destroyAdminToken from "../utils/destroyAdminToken.js";
import User from "../models/userModel.js";
import Instructor from "../models/InstructorModel.js";
import destroyToken from "../utils/destroyUserToken.js";
import destroyTokenInstructor from "../utils/destroyTokenInstructor.js";

const authAdmin = asyncHandler(async (req, res) => {
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

  const admin = await Admin.findOne({ email: email.toLowerCase() });

  if (admin) {
    if (await admin.matchPassword(password)) {
      generateTokenAdmin(res, admin._id);

      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      });
    } else {
      res.status(401);
      throw new Error("Admin not verified or invalid password");
    }
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const logoutAdmin = (req, res) => {
  res.cookie("adminJwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find(
      {},
      { name: 1, email: 1, mobile: 1, profilephoto: 1, _id: 1 }
    );

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    destroyToken(res);
    user.Blocked = true;
    await user.save();

    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    localStorage.removeItem("userInfo");

    res.status(200).json({
      success: true,
      message: `User Blocked successfully`,
      User: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile, // Add other relevant properties
      },
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const blockInstructor = asyncHandler(async (req, res) => {
  const { instructorId } = req.params;

  try {
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      res.status(404).json({ error: "Instructor not found" });
      return;
    }
    destroyTokenInstructor(res);
    // Update the block status
    instructor.Blocked = true;
    await instructor.save();

    res.status(200).json({
      message: `Instructor Blocked successfully`,

      instructor: {
        _id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        mobile: instructor.mobile, // Add other relevant properties
      },
    });
  } catch (error) {
    console.error("Error in blockInstructor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const verifyInstructor = asyncHandler(async (req, res) => {
  const { instructorId } = req.params;

  try {
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      res.status(404).json({ error: "instructoor not found" });
      return;
    }
    instructor.verified = true;

    await instructor.save();

    res.status(200).json({
      message: `Instructor verified successfully`,
      instructor: {
        _id: instructor._id,
        name: instructor.name,
        email: instructor.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getAllInstructors = asyncHandler(async (req, res) => {
  try {
    const instructors = await Instructor.find(
      {},
      {
        name: 1,
        email: 1,
        mobile: 1,
        experience: 1,
        jobrole: 1,
        companyname: 1,
        profilephoto: 1,
        idProof: 1,
        experienceCertificateFile: 1,
        _id: 1,
      }
    );
    res.status(200).json({ instructors });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const unblockInstructor = asyncHandler(async (req, res) => {
  const { instructorId } = req.params;
  const instructor = await Instructor.findById(instructorId);
  if (instructor) {
    // Check if the instructor is already unblocked
    if (!instructor.Blocked) {
      res.status(400);
      throw new Error("Instructor is already unblocked");
    }

    // Unblock the instructor
    instructor.Blocked = false;

    // Save the updated instructor data
    await instructor.save();
    res.status(200).json({
      message: "Instructor unblocked successfully",
    });
  } else {
    res.status(404);
    throw new Error("Instructor not found");
  }
});

export {
  authAdmin,
  logoutAdmin,
  getAllUsers,
  blockUser,
  blockInstructor,
  verifyInstructor,
  unblockInstructor,
  getAllInstructors,
};

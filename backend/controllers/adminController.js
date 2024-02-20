import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateTokenAdmin from "../utils/generateTokenAdmin.js";
import destroyAdminToken from "../utils/destroyAdminToken.js";
import User from "../models/userModel.js";
import Instructor from "../models/InstructorModel.js";
import Category from "../models/categoryModel.js";
import destroyToken from "../utils/destroyUserToken.js";
import destroyTokenInstructor from "../utils/destroyTokenInstructor.js";
import sendEmail from "../utils/nodemailer.js";
import Course from "../models/courseModel.js";
import Purchase from "../models/purchaseModel.js";

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
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const pageSize = 1
    const users = await User.find(
      {},
      { name: 1, email: 1, mobile: 1, profilephoto: 1, _id: 1 }
    )
      .skip((page - 1) * pageSize) // Corrected syntax: use parentheses instead of colons
      .limit(pageSize); // Corrected syntax: use parentheses instead of colons
    
    const totalUsers = await User.countDocuments(); // Count total users
    const totalPages = Math.ceil(totalUsers / pageSize);

    res.status(200).json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
      }
    });
  }
  catch (error) {
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

    res.status(200).json({
      success: true,
      message: `User Blocked successfully`,
      User: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
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
    instructor.Blocked = true;
    await instructor.save();

    res.status(200).json({
      message: `Instructor Blocked successfully`,

      instructor: {
        _id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        mobile: instructor.mobile,
      },
    });
  } catch (error) {
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
    instructor.rejected = false;

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
    res.status(500).json({ error: "Internal server error" });
  }
});

const getAllInstructors = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1

    const pageSize = 2;

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
        courses:1,
        experienceCertificateFile: 1,
        _id: 1,
      }
    )
      .skip((page - 1) * pageSize) // Corrected syntax: use parentheses instead of colons
      .limit(pageSize)
      .lean(); // Convert Mongoose documents to plain JavaScript objects // Corrected syntax: use parentheses instead of colons
    const totalInstructors = await Instructor.countDocuments(); // Count total users
console.log(instructors,'instructors');
    const totalPages = Math.ceil(totalInstructors / pageSize);
    res.status(200).json({
      success: true,
      data: {
        instructors,
        pagination: {
          currentPage: page,
          totalPages,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const unblockInstructor = asyncHandler(async (req, res) => {
  const { instructorId } = req.params;
  const instructor = await Instructor.findById(instructorId);
  if (instructor) {
    if (!instructor.Blocked) {
      res.status(400);
      throw new Error("Instructor is already unblocked");
    }

    instructor.Blocked = false;

    await instructor.save();
    res.status(200).json({
      message: "Instructor unblocked successfully",
    });
  } else {
    res.status(404);
    throw new Error("Instructor not found");
  }
});

const rejectmail = asyncHandler(async (req, res) => {
  try {
    const { reason, instructorId } = req.body;
    const subject = "Acess denied _ OnlineDo";
    const text = `Your account has rejected by the admin due to ${reason}`;
    const instructor = await Instructor.findById(instructorId);
    const { email } = instructor;
    instructor.rejected = true;
    instructor.rejectReason = reason;
    instructor.verified = false;
    await instructor.save();

    const result = await sendEmail(email, subject, text);
    res.json({
      success: true,
      message: "Rejection email sent successfully",
      instructor,
    });
  } catch (error) {
    console.error(error, "error");
  }
});


const countUser = asyncHandler(async (req, res) => {
  try {
    const count = await User.countDocuments({})
    console.log(count,'count');
    res.json({
      success: true,
      message: "fetched count successfully",
      count,
    })
  } catch (error) {
    console.error(error);
        res.status(500).json({ message: "Internal server error" });

  }
})

const countInstructor = asyncHandler(async (req, res) => {
  try {
    const count = await Instructor.countDocuments({})
    res.json({
      success: true,
      message: "fetched count successfully",
      count,
    })
  } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Internal server error" });
  }
})

const CountCourse = asyncHandler(async (req, res) => {
  try {
    const count = await Course.countDocuments({})
    res.json({
      success: true,
      message: "Fetched course",
      count,
    })
  } catch (error) {
    console.error(error);
  }
})


const YearlyRevenue = asyncHandler(async (req, res) => {
   try {
     const currentDate = new Date();
     const startDate = new Date(currentDate.getFullYear(), 0, 1); // January 1st of the current year
     const endDate = new Date(currentDate.getFullYear(), 11, 31); // December 31st of the current year

     const purchases = await Purchase.find({
       purchaseDate: { $gte: startDate, $lte: endDate },
     }).populate("courses");
console.log(purchases,'purchases');
     let yearlyRevenue = 0;

     purchases.forEach((purchase) => {
    console.log(purchase.courses.price,'kk');
    if (purchase.courses && purchase.courses.price) {
      yearlyRevenue += purchase.courses.price;
    }
     });
     console.log(yearlyRevenue,'k');
     res.json({ revenue: yearlyRevenue });
   } catch (error) {
    console.error("Error fetching yearly revenue:", error);
    res.status(500).json({ error: "Internal server error" });
   }
})

const MonthlyRevenue = asyncHandler(async (req, res) => {
  try {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ); // First day of the current month
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ); // Last day of the current month

    const purchases = await Purchase.find({
      purchaseDate: { $gte: startDate, $lte: endDate },
    }).populate("courses");

    let monthlyRevenue = 0;
     purchases.forEach((purchase) => {
       console.log(purchase.courses.price, "kk");
       if (purchase.courses && purchase.courses.price) {
         monthlyRevenue += purchase.courses.price;
       }
     });
    res.json({ revenue: monthlyRevenue });
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    res.status(500).json({ error: "Internal server error" });
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
  rejectmail,
  countUser,
  countInstructor,
  CountCourse,
  MonthlyRevenue,
  YearlyRevenue,
};

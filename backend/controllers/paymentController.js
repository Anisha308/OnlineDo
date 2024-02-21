import Stripe from "stripe";
import Instructor from "../models/InstructorModel.js";
import Purchase from "../models/purchaseModel.js";
const stripeInstance = Stripe(process.env.STRIPE_SECRET);
import Course from "../models/courseModel.js";
import asyncHandler from "express-async-handler";

const setStripeSession = async (req, res) => {
  try {
    const { price } = req.params;

    const numPrice = Number(price);

    const user = req.body.user;
    const course = req.body.courses.course; // Assuming you have course information in the request
  
    const instructor = await Instructor.findOne({
    name: req.body.instructorName,
    });
    
    if (instructor && user && course) {
      const newPurchase = new Purchase({
        user: user._id,
        courses: course._id,
        instructor:instructor._id,
      });
      await newPurchase.save();
    }
  
    if (instructor) {
      const session = await stripeInstance.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "INR",
              product_data: {
                name: `${instructor.name}`,
                description: ` OnlineDo `,
              },
              unit_amount: parseFloat(price) * 100, // or parseInt(price, 10) * 100
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        billing_address_collection: "required", // Include this line to collect billing address
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/fail`,
        submit_type: "auto", // Automatically submit the payment
      });

      res.send(session.url);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getPurchaseByUser = async (req, res) => {
  try {
const userId=req.params.userId
    const purchases = await Purchase.find({ user: userId }).populate({
      path: "courses",
      populate: {
        path: "instructor",
      },
    });
    
    const detailedCourses = []
    
    for (const purchase of purchases) {
      const courseId = purchase.courses
      const courseDetails=await Course.findById(courseId)
    
    detailedCourses.push(courseDetails)
    
    }
    
    res.json({ detailedCourses });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
const YearlyRevenue = asyncHandler(async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const yearlyData = [];

    for (let year = 2021; year <= currentYear; year++) {
      const startDate = new Date(year, 0, 1); // January 1st
      const endDate = new Date(year, 11, 31); // December 31st

      const purchases = await Purchase.find({
        purchaseDate: { $gte: startDate, $lte: endDate },
      }).populate("courses");

      let yearlyRevenue = 0;
      purchases.forEach((purchase) => {
        if (purchase.courses && purchase.courses.price) {
          yearlyRevenue += purchase.courses.price;
        }
      });

      yearlyData.push({ year: year, revenue: yearlyRevenue });
    }
    console.log("Yearly revenue data:", yearlyData);
    res.json(yearlyData);
  } catch (error) {
    console.error("Error fetching yearly revenue:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const MonthlyRevenue = asyncHandler(async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const monthlyRevenue = [];
    for (let i = 0; i <= currentMonth; i++) {
      const startDate = new Date(currentYear, i, 1);
      const endDate = new Date(currentYear, i + 1, 0);

      const purchases = await Purchase.find({
        purchaseDate: { $gte: startDate, $lte: endDate },
      }).populate("courses");

      let monthlyTotal = 0;
      purchases.forEach((purchase) => {
        if (purchase.courses && purchase.courses.price) {
          monthlyTotal += purchase.courses.price;
        }
      });

      monthlyRevenue.push({ month: i + 1, revenue: monthlyTotal });
    }
    console.log(monthlyRevenue, "montnhlyrevenue");
    res.json(monthlyRevenue);
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export { setStripeSession, getPurchaseByUser, MonthlyRevenue, YearlyRevenue };

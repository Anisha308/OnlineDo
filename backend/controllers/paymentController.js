import Stripe from "stripe";
import Instructor from "../models/InstructorModel.js";
import Purchase from "../models/purchaseModel.js";
const stripeInstance = Stripe(process.env.STRIPE_SECRET);
import Course from "../models/courseModel.js";


const setStripeSession = async (req, res) => {
  try {
    const { price } = req.params;

    const numPrice = Number(price);

    const user = req.body.user;
    const course = req.body.courses.course; // Assuming you have course information in the request

    if (user && course) {
      const newPurchase = new Purchase({
        user: user._id,
        courses: course._id,
      });
      await newPurchase.save();
    }
    const instructor = await Instructor.findOne({
      name: req.body.instructorName,
    });
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
export { setStripeSession, getPurchaseByUser };

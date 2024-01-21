import Stripe from "stripe";
import Instructor from "../models/InstructorModel.js";
import Purchase from "../models/purchaseModel.js";
const stripeInstance = Stripe(process.env.STRIPE_SECRET);
import Course from "../models/courseModel.js";
const setstripe = async (req, res) => {
  try {
    const { price } = req.params;
    console.log(req.body.courses.course,'rebkddddddddddddddddddddddddddddddddddddd');
    console.log("priceeeeeeeeeeeeeeeeeeeee");
    const numPrice = Number(price);

 const user=req.body.user
    const course = req.body.courses.course; // Assuming you have course information in the request
console.log("User:", user);
console.log("Course:", course);
    if (user && course) {
      console.log('noooooo');
      const newPurchase = new Purchase({
        user: user._id,
        courses: course._id,
      })
      console.log(newPurchase,'newpurchade');
      await newPurchase.save()
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
                name: `Dr.${instructor.name}`,
                description: ` At `,
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
    console.log(req.params,'red');
const userId=req.params.userId
    console.log(userId,'uerid');
    const purchases = await Purchase.find({ user: userId }).populate('courses')
        
    const detailedCourses = []
    
    for (const purchase of purchases) {
      const courseId = purchase.courses
      console.log(courseId,'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
      const courseDetails=await Course.findById(courseId)
    
    detailedCourses.push(courseDetails)
    
    }
    
    res.json({ detailedCourses });
console.log(purchases,'purchases');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
export { setstripe ,getPurchaseByUser};

import Stripe from "stripe";
import Instructor from "../models/InstructorModel.js";
const stripeInstance = Stripe(process.env.STRIPE_SECRET);

const setstripe = async (req, res) => {
  try {
    const { price } = req.params;
    const numPrice = Number(price);
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
                description: ` At lfkdsf`,
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

export { setstripe };

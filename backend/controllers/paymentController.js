
import Stripe from "stripe";
import express from "express";

// const app = express();
// app.use(express.static("public"));
// const YOUR_DOMAIN = `http://localhost:${process.env.PORT}`;
const stripeInstance = Stripe(process.env.STRIPE_SECRET);

const setstripe = async (req, res) => {
  try {
    const { price } = req.params;
    const numPrice = Number(price);
    console.log(typeof numPrice);

     const customer = await stripeInstance.customers.create({
       name: "Dummy Name",
       address: {
         line1: "Dummy Address",
         postal_code: "12345",
         city: "Dummy City",
         state: "Dummy State",
         country: "US",
       },
     });

  const session = await stripeInstance.checkout.sessions.create({
    customer: customer.id,
    line_items: [
      {
        price_data: {
          currency: "INR",
          product_data: {
            name: "anisha",
            description: "Work Successfully Completed!! Thank you",
          },
          unit_amount: numPrice * 100,
        },
        quantity: 1,
      },
    ],
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/fail`,
    submit_type: "auto", // Automatically submit the payment
  });

  
    console.log("Stripe Session ID:", session.id);
    console.log("Stripe Session URL:", session.url);
    res.send(session.url);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export { setstripe };

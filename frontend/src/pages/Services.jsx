// import { format } from "date-fns";
import stripeModule from "stripe"; // Renamed the import to avoid naming conflict
import User from "../../../backend/models/userModel"

// Initialize Stripe with your secret key
const stripe = stripeModule(process.env.SECRET_KEY);

const paymentInitiated = async (req, res) => {
  console.log("data in payment", req.body);
  // const indianDate = format(new Date(req.body.date), "dd/MM/yyyy");
  // console.log(indianDate);

  try {

    const doctor = await User.findOne({_id:req.body.doctor,role:'doctor'})
    if(doctor){

    
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: "INR",
                  product_data: {
                    name: `Dr.${doctor.name}`,
                    description:` At ${req.body.slot} on ${req.body.date}`,
                  },
                  unit_amount: req.body.fee * 100,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            billing_address_collection: 'required', // Include this line to collect billing address
            success_url:` ${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
          });
          
// console.log(session,'session')
// console.log(session.status,'status')

    res.send({ url: session.url,success:true });
}else{
    res.status(404).json({message:"Doctor not found"})
}
  } catch (error) {
    console.error(error); 
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const sessionStatus = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
    console.log(req.body.sessionId,'session')
    console.log("session-second",session.status);
  
    res.send({
      status: session.status,
      paymentId:session.id,
      customer_email: session.customer_details.email,
    });
  };

export { paymentInitiated,sessionStatus };
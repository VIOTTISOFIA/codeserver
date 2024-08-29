// aca metemos toda la logica de stripe para poder efectivamente el proceso del pago
import Stripe from "stripe";
import cartsManager from "../data/mongo/Manager.mongo.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentRepository = async (user_id) => {
  try {
    let productsOnCart = await readCart({ user_id });
    productsOnCart = productsOnCart.map((each) => new CheckoutProduct(each));
    console.log(productsOnCart);
    const line_items = productsOnCart;
    const mode = "payment";
    const success_url = "http://localhost:8080/thanks.html";
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) {
    throw error;
  }
};
export { createPaymentRepository };

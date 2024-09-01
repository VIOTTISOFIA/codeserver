import Stripe from "stripe";
import environment from "../utils/env.util.js";
import cartsManager from "../data/mongo/managers/CartsManager.mongo.js";
import CheckoutProduct from "../dto/checkoutProduct.dto.js";

const stripe = new Stripe(environment.STRIPE_SECRET_KEY);

const createPaymentRepository = async (user_id) => {
  try {
    let productsOnCart = await cartsManager.readCart({ user_id });
    console.log(productsOnCart);
    productsOnCart = productsOnCart.map(
      (product) => new CheckoutProduct(product)
    );
    console.log(productsOnCart);
    const line_items = productsOnCart;
    const mode = "payment";
    const success_url = "http://localhost:8080/api/payment/success";
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

const emptyCartRepository = async (user_id) => {
  try {
    const result = await cartsManager.destroyAll(user_id);
    return result;
  } catch (error) {
    throw error;
  }
};

export { createPaymentRepository, emptyCartRepository };

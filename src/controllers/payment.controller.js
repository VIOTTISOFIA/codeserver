import {
  createPaymentService,
  emptyCartService,
} from "../services/payment.service.js";

const createPayment = async (req, res, next) => {
  try {
    const response = await createPaymentService(req.user._id);
    return res.response200("CREATED", response);
  } catch (error) {
    return next(error);
  }
};

const successPayment = async (req, res, next) => {
  const { _id: user_id } = req.user;
  try {
    await emptyCartService(user_id);

    // Redirigir a la página de confirmación
    res.redirect("/thankyou");
  } catch (error) {
    return next(error);
  }
};

export { createPayment, successPayment };

import { createPaymentService } from "../services/payment.service.js";

const createPayment = async (req, res, next) => {
  try {
    const response = await createPaymentService(req.user._id);
    return res.response201(response);
  } catch (error) {
    return next(error);
  }
};
export { createPayment };

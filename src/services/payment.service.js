import {
  createPaymentRepository,
  emptyCartRepository,
} from "../repositories/payment.rep.js";

const createPaymentService = async (user_id) => {
  try {
    const response = await createPaymentRepository(user_id);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const emptyCartService = async (user_id) => {
  try {
    const response = await emptyCartRepository(user_id);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { createPaymentService, emptyCartService };

import { createPaymentRepository } from "../repositories/payment.rep.js";

const createPaymentService = async (user_id) => {
  try {
    const response = await createPaymentRepository(user_id);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export { createPaymentService };

import { createPaymentRepository } from "../repositories/payments.rep.js";

const createPaymentService = async (user_id) => {
  try {
    const response = await createPaymentRepository(user_id);
  } catch (error) {
    throw new Error(error);
  }
};
export { createPaymentService };

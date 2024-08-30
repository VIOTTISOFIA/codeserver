// import { createPaymentService } from "../services/payment.service.js";

// const createPayment = async (req, res, next) => {
//   try {
//     const response = await createPaymentService(req.user._id);
//     return res.response201(response);
//   } catch (error) {
//     return next(error);
//   }
// };
// export { createPayment };

import { createPaymentService } from "../services/payment.service.js";

const createPayment = async (req, res, next) => {
  try {
    // Lógica de creación de pago
    const response = await createPaymentService(req.user._id);

    // Si el pago es exitoso, renderizar la vista success.handlebars
    res.render("success", { userEmail: req.user.email });
  } catch (error) {
    return next(error);
  }
};

export { createPayment };

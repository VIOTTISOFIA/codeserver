// import CustomRouter from "../customRouter.js";
// import { createPayment } from "../../controllers/payment.controller.js";

// class PaymentRouter extends CustomRouter {
//   init() {
//     this.create("/", ["USER"], ["ADMIN"], createPayment);
//   }
// }
// export default new PaymentRouter().getRouter();

// routes/payments.api.js
import CustomRouter from "../customRouter.js";
// import isAuth from "../../middlewares/isAuth.mid.js"; // Añadir autenticación si es necesario
import { createPayment } from "../../controllers/payment.controller.js";

class PaymentRouter extends CustomRouter {
  init() {
    // Añadir políticas de acceso y autenticación según tus necesidades
    this.create("/", ["USER"], ["ADMIN"], createPayment);
  }
}

export default new PaymentRouter().getRouter();

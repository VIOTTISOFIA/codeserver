import CustomRouter from "../customRouter.js";
import { createPayment } from "../../controllers/payment.controller.js";

class PaymentRouter extends CustomRouter {
  init() {
    this.create("/", ["USER"], ["ADMIN"], createPayment);
  }
}
export default new PaymentRouter().getRouter();
